import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { CdkAuthServiceStack } from "../cdk-auth-service-stack";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { CfnOutput } from "aws-cdk-lib";

export function defineOutputs(stack: CdkAuthServiceStack, table : Table, api : RestApi) : void {
    new CfnOutput(stack, 'ApiUrl', {
        value: api.url,
        description: 'The URL of the API Gateway endpoint',
      });
      new CfnOutput(stack, 'TableName', {
        value: table.tableName,
        description: 'The name of the DynamoDB table',
      });
}