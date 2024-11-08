import { AwsIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { CdkAuthServiceStack } from "../cdk-auth-service-stack";
import { Resource } from "aws-cdk-lib";
import { Integrations } from "../awsintegration/aws-integration-define";

export function defineResource(api : RestApi, integrations : Integrations) : void {
    const resource = api.root.addResource('endusers');
    resource.addMethod('GET', integrations.getIntegration, {
        methodResponses: [{ statusCode: '200' }],
        requestParameters: {
          'method.request.querystring.id': true,
        },
      });
  
      resource.addMethod('POST', integrations.putIntegration, {
        methodResponses: [{ statusCode: '200' }],
      });
}