import React from 'react';
import { object } from 'prop-types';

export default function withIcons() {
  return (ReactComponent) => {
    class IconComponent extends React.Component {
      static contextTypes = {
        icons: object.isRequired,
      };

      /* eslint-disable no-useless-constructor */
      constructor(props, context) {
        super(props, context);
      }

      getIcon = (key) => {
        const icon = this.context.icons[key];

        if (!icon) {
          throw `The icon with ${key} is not present inside icons. Maybe you forget to declare it? Review icons.json`; // eslint-disable-line no-throw-literal
        }

        return icon;
      };

      render() {
        return <ReactComponent getIcon={this.getIcon} {...this.context} {...this.props} />;
      }
    }

    return IconComponent;
  };
}
