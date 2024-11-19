import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Integrations } from "../awsintegration/aws-integration-define";

export function defineResource(api : RestApi, integrations : Integrations) : void {
    const resource = api.root.addResource('user');
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