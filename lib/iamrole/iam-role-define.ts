import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { CdkAuthServiceStack } from "../cdk-auth-service-stack";

export function defineRole(stack : CdkAuthServiceStack) : Role {
    const role = new Role(stack, 'AuthServiceRole', {
        assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
    })
    return role;
}