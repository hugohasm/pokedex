const React = require('react');
const {Text} = require('react-native');

const Icon = props => React.createElement(Text, props, props.name || 'icon');

module.exports = Icon;
