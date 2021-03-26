import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Picker, 
  Linking
} from "react-native";

import { WebView } from 'react-native-webview';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      loading: true,
      user_id: "",
      client_id: "",
      api_key: "",
      init: false,
      env: "int-",
      widget: "connect_widget"
    };
  }

  

  getWidget() {
  
      fetch("https://atrium.mx.com/users/USR-f8c59eac-4e60-4b99-bf28-8b70b38fa781/connect_widget_url", {
        body: "{\"ui_message_version\": 4, \"is_mobile_webview\": true}",
        headers: {
          Accept: "application/vnd.mx.atrium.v1+json",
          "Content-Type": "application/json",
          "Mx-Api-Key": "816ea809faf706c44ec90f7b73cafab91831654c",
          "Mx-Client-Id": "086f2d03-9df1-4ab7-b3e2-f549dcaa0f04"
        },
        method: "POST"
        }
      )
        .then(res => res.json())
        .then(
          result => {
            console.log(result)
            console.log(result.user.connect_widget_url);
            widgetURL = result.user.connect_widget_url;
            this.setState({
              url: widgetURL,
              loading: false
            });
          },
          error => {
            console.log(error);
          }
        )
        .catch(function() {
          console.log(
            "There has been a problem with your fetch operation: " 
          );
          throw error;
        });
    
  }

  loadWidget() {
    if (this.state.loading) {
      return <ActivityIndicator style={styles.container} size="large" />;
    }

    const injectedJavascript = `
    setTimeout(() => {
      const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); 
    }, 100);
`;
    return (

      
      <WebView
        source={{
          uri: this.state.url
        }}
        originWhitelist={['atrium://', 'https://int-widgets.moneydesktop.com', 'https://widgets.moneydesktop.com']}
        onShouldStartLoadWithRequest={request => {
           if (request.url.startsWith("https://int-widgets.moneydesktop.com") || request.url.startsWith("https://widgets.moneydesktop.com")) {
          return request.url
        } else if (request.mainDocumentURL.startsWith("atrium://")) {

console.log(request.mainDocumentURL)

        }
          }}
        // javaScriptEnabled={true}
        // injectedJavaScript={injectedJavascript}
        startInLoadingState
        style={{ flex: 1}}
      />
    );
  }

  _handleSubmit() {
    this.setState({
      init: true
    });
    return this.getWidget();
  }

  init() {
    if (this.state.init) {
      return this.loadWidget();
    }
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputStyle}
            label="user_id"
            placeholder="user_id"
            returnKeyType={"next"}
            onChangeText={user_id => this.setState({ user_id })}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
          />
          <TextInput
            style={styles.inputStyle}
            label="client_id"
            placeholder="client_id"
            returnKeyType={"next"}
            onChangeText={client_id => this.setState({ client_id })}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
          />
          <TextInput
            style={styles.inputStyle}
            label="api_key"
            placeholder="api_key"
            returnKeyType={"next"}
            onChangeText={api_key => this.setState({ api_key })}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
          />

          <Picker
            selectedValue={this.state.env}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ env: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item label="int" value="int-" />
            <Picker.Item label="prod" value="" />
          </Picker>

          <Picker
            selectedValue={this.state.widget}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ widget: itemValue })
            }
          >
            <Picker.Item label="accounts_widget" value="accounts_widget" />
            <Picker.Item label="budgets_widget" value="budgets_widget" />
            <Picker.Item label="cash_flow_widget" value="cash_flow_widget" />
            <Picker.Item label="connect_widget" value="connect_widget" />
            <Picker.Item
              label="connections_widget"
              value="connections_widget"
            />
            <Picker.Item label="debts_widget" value="debts_widget" />
            <Picker.Item label="goals_widget" value="goals_widget" />
            <Picker.Item label="help_widget" value="help_widget" />
            <Picker.Item
              label="investments_widget"
              value="investments_widget"
            />
            <Picker.Item label="master_widget" value="mobile_master_widget" />
            <Picker.Item label="net_worth_widget" value="net_worth_widget" />
            <Picker.Item
              label="notifications_settings_widget"
              value="notifications_settings_widget"
            />
            <Picker.Item label="pulse_widget" value="pulse_widget" />
            <Picker.Item label="settings_widget" value="settings_widget" />
            <Picker.Item label="spending_widget" value="spending_widget" />
            <Picker.Item
              label="transactions_widget"
              value="transactions_widget"
            />
            <Picker.Item label="trends_widget" value="trends_widget" />
          </Picker>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.button}
          onPress={this._handleSubmit.bind(this)}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return this.init();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  inputStyle: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 40,
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10
  },

  button: {
    alignItems: "center",
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 40,
    padding: 10,
    marginTop: 40
  },
  buttonText: {
    fontSize: 18
  }
});


