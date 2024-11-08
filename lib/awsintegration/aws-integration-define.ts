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
                attributeName: { S: "$input.path('$.attributeName')" },
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
  
      return {getIntegration, putIntegration};
    
}

export interface Integrations {
    getIntegration : AwsIntegration;
    putIntegration : AwsIntegration;
}