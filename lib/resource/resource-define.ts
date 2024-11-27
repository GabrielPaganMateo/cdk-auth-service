import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Integrations } from "../awsintegration/aws-integration-define";

export function defineResource(api : RestApi, integrations : Integrations) : void {
    const userResource = api.root.addResource('user');

    userResource.addMethod('GET', integrations.getIntegration, {
      methodResponses: [{ statusCode: '200' }],
      requestParameters: {
        'method.request.querystring.id': true,
      },
    });
  
    userResource.addMethod('POST', integrations.putIntegration, {
      methodResponses: [{ statusCode: '200' }],
    });

    const emailResource = userResource.addResource('email')
    emailResource.addMethod('POST', integrations.getUserByEmailIntegration, {
      methodResponses: [{statusCode : '200'}]
    })
}