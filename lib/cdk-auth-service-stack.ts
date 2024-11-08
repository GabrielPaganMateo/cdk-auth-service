import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { defineDynamoDB, grantAccess } from './dynambodb/dynamo-db-define';
import { defineApiGateway } from './apigateway/api-gateway-define';
import { defineRole } from './iamrole/iam-role-define';
import { defineAwsIntegration } from './awsintegration/aws-integration-define';
import { defineResource } from './resource/resource-define';
import { defineOutputs } from './output/output-define';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkAuthServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const table = defineDynamoDB(this);
    const api = defineApiGateway(this);
    const role = defineRole(this);
    const integrations = defineAwsIntegration(table, role)
    defineResource(api, integrations);
    grantAccess(table, role);
    defineOutputs(this, table, api);
  }
}
