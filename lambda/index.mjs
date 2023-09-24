import { CloudFormation } from '@aws-sdk/client-cloudformation';

export const handler = async (event, context) => {
    try {
        // Extract the parameter value from the event detail
        const parameterValue = event.detail.state;

        // Initialize the CloudFormation client
        const cloudformation = new CloudFormation();

        // Specify the stack name and parameter values
        // set the other mandatory parameters to their previous values: Timezone, EntryPoint, MinecraftTypeTag, Command, Seed
        const stackName = 'minecraft-2';
        const parameters = [
            {
                ParameterKey: 'ServerState',
                ParameterValue: parameterValue  // Use the parameter value from the event
            },
            {
                ParameterKey: 'Timezone',
                UsePreviousValue: true
            },
            {
                ParameterKey: 'Seed',
                UsePreviousValue: true
            },
            {
                ParameterKey: 'EntryPoint',
                UsePreviousValue: true
            },
            {
                ParameterKey: 'MinecraftTypeTag',
                UsePreviousValue: true
            },
            {
                ParameterKey: 'Command',
                UsePreviousValue: true
            }
        ];


        // Update the stack with the specified parameters
        // make sure capabilities are set to CAPABILITY_NAMED_IAM
        const params = {
            StackName: stackName,
            UsePreviousTemplate: true,  // Use the previous template
            Capabilities: ['CAPABILITY_NAMED_IAM'],
            Parameters: parameters
        };

        const response = await cloudformation.updateStack(params);

        // Check if the update was successful
        if (response.$metadata.statusCode === 200) {
            return "Stack update initiated successfully";
        } else {
            return "Stack update failed";
        }

    } catch (error) {
        return `Error: ${error.message}`;
    }
};
