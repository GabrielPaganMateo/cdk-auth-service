import { Table } from "aws-cdk-lib/aws-dynamodb";
import { AwsIntegration } from "aws-cdk-lib/aws-apigateway";
import { Role } from "aws-cdk-lib/aws-iam";

export function defineAwsIntegration(table : Table, role : Role) : Integrations {
    const getIntegration = new AwsIntegration({
        service: 'dynamodb',
        action: 'GetItem',
        options: {
          credentialsRole: role,
          requestTemplates: {
            'application/json': JSON.stringify({
              TableName: table.tableName,
              Key: {
                id: { S: "$input.params('id')" },
              },
            }),
          },
          integrationResponses: [
            {
              statusCode: '200',
            },
          ],
        },
      });

    
      const putIntegration = new AwsIntegration({
        service: 'dynamodb',
        action: 'PutItem',
        options: {
          credentialsRole: role,
          requestTemplates: {
            'application/json': JSON.stringify({
              TableName: table.tableName,
              Item: {
                id: { S: "$input.path('$.id')" },
                // Add other attributes here based on your table schema
                email: { S: "$input.path('$.email')" },
                password: { S: "$input.path('$.password')" },
              },
            }),
          },
          integrationResponses: [
            {
              statusCode: '200',
              responseTemplates : {
                'application/json' : `"message" : "User Created".`
              }
            },
            {
              selectionPattern : '4\\d{2}',
              statusCode : '400',
              responseTemplates : {
                'application/json' : `"message" : "Client Request Error"`
              }
            },
            {
              selectionPattern : '5\\d{2}',
              statusCode : '500',
              responseTemplates : {
                'application/json' : `"message" : "Server Response Error"`
              }
            }
          ],
        },
      });

      const getUserByEmailIntegration = new AwsIntegration({
        service: 'dynamodb',
        action: 'Query',
        integrationHttpMethod: 'POST',
        options: {
          credentialsRole : role,
          requestTemplates: {
            // Map the incoming request to DynamoDB's Query operation
            'application/json': JSON.stringify({
              TableName: table.tableName,
              IndexName: 'emailIndex',
              KeyConditionExpression: 'email = :email',
              ExpressionAttributeValues: {
                ':email': {
                  S: "$input.path('$.email')",
                },
              },
            }),
          },
          integrationResponses: [
            {
              statusCode: '200',
              responseTemplates: {
                // Extract a boolean from the response
                'application/json': `
                  #set($isRegistered = ($input.path('$.Count') > 0))
                  {
                    "isRegistered" : $isRegistered
                  }  
                `
              },
            }
          ]

      }
    })
  
      return {getIntegration, putIntegration, getUserByEmailIntegration};
    
}

export interface Integrations {
    getIntegration : AwsIntegration;
    putIntegration : AwsIntegration;
    getUserByEmailIntegration : AwsIntegration;
}