export const Messages = {
  errors: {
    error: 'Error',
    loginErr: 'We’re unable to find an account that matches that email address. Please try again.',
    sessionExpired: 'Session expired! Please login in to continue',
    badRequest: 'Bad request. Please try again.',
    serverErr: 'Something went wrong. Please try again.',
    validationErr: 'Please fill all required fields.',
    invalidLink: 'This link is no longer valid. Redirecting to login.',
    permissionErr : 'You do not have permission to perform this action.',
    uploadFailed: 'Failed to upload document',
    attachFailed: 'Failed to attach document',
    noTaskFound: 'Task not found.',
    noProjectFound: 'Project not found.',
    assignTask: 'Please Assign this task to a team member or group in order to create it!',
    assignWorkflow: 'Please Assign this workflow to a team member or group in order to create it!',
    assignOwner: 'Please Assign a team member or group in order to create it!',
    validReceipientEmail: 'Please enter valid receipient email',
    requiredNameAndEmail: 'Receipient name and email are required fields',
    inputMessage: 'Please input a message to send',
    taskNameLength: 'Task name should not be more than 254 characters!',
    taskNameRequired: 'Please fill all task name field.',
    projectNameRequired: 'Please fill project name field.',
    projectNameLength: 'Project name should not be more than 254 characters!',
    workFlowNameLength: 'Workflow name should not be more than 254 characters!',
    workFlowNameRequired: 'Please fill all workflow name field.',
    noTagFound: 'Tag not found.'
  },
  success: {
    success: 'Success',
    logout: 'Logged out successfully!',
    auth: {
      forgotPwdMsg: 'Password recovery email has been sent. Please check your inbox or spam folder.'
    },
    task: {
      notification: 'Ping sent successfully',
      taskUpdated: 'Task was successfully updated!',
      renamed: 'Task renamed successfully!',
    },
    documentDel: 'Document deleted successfully!',
    taskDelete: 'Task deleted successfully!',
    taskCreated: 'Task created successfully!',
    workflowCreated: 'Workflow created successfully!',
    projectCreated: 'Project created successfully!',
    filesAttachedMsg: 'Files successfully attached with message',
    filesAttached: 'Files successfully uploaded and attached',
    linkedToRequest: ' linked to request successfully!'
  },
  popups: {
    deletedMsg: {
      title: 'Delete Message',
      message: 'Once you have deleted this message, this action cannot be reversed.'
    },
    deleteDoc: {
      title: 'Delete Document',
      message: 'Once you have deleted this document, this action cannot be reversed.'
    }
  }
};
