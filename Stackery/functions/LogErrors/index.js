module.exports = async message => {
    console.log(`Error in node ${message.stackery.node.name} - ${message.class} - ${message.message} - stack trace: ${message.stack}`);
}