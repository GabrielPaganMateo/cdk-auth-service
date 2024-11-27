import { aws_dynamodb, RemovalPolicy } from "aws-cdk-lib";
import { CdkAuthServiceStack } from "../cdk-auth-service-stack";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Role } from "aws-cdk-lib/aws-iam";

export function defineDynamoDB(stack : CdkAuthServiceStack) : Table {
    const table = new Table(stack, 'AuthServiceDynamoDB', {
        partitionKey : { name : 'id', type : aws_dynamodb.AttributeType.STRING},
        tableName : 'auth-service-end-users',
        removalPolicy : RemovalPolicy.DESTROY
    })
    table.addGlobalSecondaryIndex({
        indexName: 'emailIndex',
        partitionKey: { name : 'email', type : AttributeType.STRING},
        projectionType: aws_dynamodb.ProjectionType.ALL 
        /*
            This means all attributes of the table (e.g., id and email) 
            will be available in the Global Secondary Index (GSI). 
            If you only care about email for the query and id isn't needed 
            in the index results, consider using KEYS_ONLY or INCLUDE for efficiency.
        */
    })
    return table;
}

export function grantAccess(table : Table, role : Role) : void {
    table.grantReadWriteData(role);
}
