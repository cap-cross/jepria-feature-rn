import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Errors from '../api/errors';
import { Buffer } from "buffer";

export const SecurityContext = createContext();

export const getTokenAsync = async () => {
  const token = await SecureStore.getItemAsync('userToken');
  return token;
}

export default SecurityProvider = ({ userPin, userToken, loginURL, children, metaInfoUrl, roles }) => {

  const [authenticating, setAuthenticating] = useState(false);
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [pin, setPin] = useState(userPin);

  useEffect(() => {
    getUser()
  }, [token]);

  const saveToken = async (token) => {
    try {
      setToken(token);
      await SecureStore.setItemAsync('userToken', token);
    } catch (error) {
      setError(error);
    }
  }
 
  const removeToken = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setToken('');
    } catch (error) {
      setError(error)
    }
  }

  const getToken = async () => {
    try {
      let result;
      if (token) {
        result = token
      } else {
        result = await getTokenAsync();
        setToken(token);
      }
      return result;
    } catch (error) {
      setError(error)
    }
  }

  const removePin = async () => {
    try {
      await SecureStore.deleteItemAsync('userPin');
      setPin('');
    } catch (error) {
      setError(error)
    }
  }

  const savePin = async pin => {
    try {
      await SecureStore.setItemAsync('userPin', pin);
      setPin(pin);
    } catch (error) {
      setError(error);
    }
  }

  const getUser = async () => {
    if (token) {
      fetch(metaInfoUrl + "/current-user", 
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Basic ${token}`
        }
      }).then(response => {
        if (response.ok && response.status == 200) {
          response.json().then(currentUser => {
            if (roles.length > 0) {
              fetch(metaInfoUrl + "/current-user/test-roles?roles=" + roles.toString(), 
              {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Authorization': `Basic ${token}`
                }
              }).then(response => {
                if (response.ok && response.status == 200) {
                  response.json().then(hasRoles => {
                    setUser({
                      ...currentUser,
                      roles: hasRoles
                    });
                  })
                } else {
                  if (response.status === 401) {
                    throw new Errors.APIError("Неверные данные", Errors.AUTHENTICATION_ERROR)
                  } else {
                    throw new Error("Network connection problem")
                  }
                }
              })
            } else {
              setUser(currentUser);
            }
          })
        } else {
          if (response.status === 401) {
            throw new Errors.APIError("Неверные данные", Errors.AUTHENTICATION_ERROR)
          } else {
            throw new Error("Network connection problem")
          }
        }
      }).catch(error => {
        setError(error)
      })
    } else {
      setUser();
    }
  }


  const login = (username, password) => {
    console.log("Processing authentication...");
    setAuthenticating(true);
    return fetch(loginURL + '?' + 'username=' + username + '&password=' + password,
    {
      method: 'POST',
      credentials: 'include'
    })
    .then((response) => {
      if (response.status === 200 || response.status === 302) {
        console.log("Authentication completed...");
        return new Promise(function(resolve) {
          saveToken(new Buffer(username + ":" + password).toString("base64"));
          resolve();
        }).then(() => {
          setAuthenticating(false);
        })
      } else {
        if (response.status === 401) {
          throw new Errors.APIError("Неверные данные", Errors.AUTHENTICATION_ERROR)
        } else {
          throw new Error("Network connection problem")
        }
      }
    })
    .catch((error) => {
      setAuthenticating(false);
      setError(error)
      logout();
      throw error;
    })
  };

  const logout = async () => {
    await removeToken();
    await removePin();
  }

  return (
    <SecurityContext.Provider value={{token, user, getToken, logout, login, isAuthenticating: authenticating, error, pin, savePin}}>
      {children}
    </SecurityContext.Provider>
  );
}