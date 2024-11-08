import { aws_dynamodb, RemovalPolicy } from "aws-cdk-lib";
import { CdkAuthServiceStack } from "../cdk-auth-service-stack";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Role } from "aws-cdk-lib/aws-iam";

export function defineDynamoDB(stack : CdkAuthServiceStack) : Table {
    const table = new Table(stack, 'AuthServiceDynamoDB', {
        partitionKey : { name : 'id', type : aws_dynamodb.AttributeType.STRING},
        tableName : 'auth-service-end-users',
        removalPolicy : RemovalPolicy.DESTROY
    })
    return table;
}

export function grantAccess(table : Table, role : Role) : void {
    table.grantReadWriteData(role);
}
