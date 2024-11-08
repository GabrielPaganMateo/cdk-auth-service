import { Resource } from "aws-cdk-lib";
import { CdkAuthServiceStack } from "../cdk-auth-service-stack";
import { RestApi } from "aws-cdk-lib/aws-apigateway";


export function defineApiGateway(stack : CdkAuthServiceStack) : RestApi {
    const api = new RestApi(stack, 'AuthServiceApiGateway', {
        restApiName : 'auth-service-api-gateway',
        description : 'Proxy for auth-service-end-users table'
    })
    return api;
}