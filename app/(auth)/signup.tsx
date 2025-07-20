import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

export default function ArsonaSignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const buttonScale = new Animated.Value(1);

  const handleFocus = (field:any) => setIsFocused(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field:any) => setIsFocused(prev => ({ ...prev, [field]: false }));

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleSignUp = () => {
    // Add your sign up logic here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

          {/* Background Overlay */}
          <View style={styles.overlay} />

          <View style={styles.content}>
            {/* Logo/Title Section */}
            <View style={styles.header}>
              <Ionicons name="shield-checkmark" size={48} color="#FF6B35" style={styles.logo} />
              <Text style={styles.title}>ARSONA{"\n"}SENTINEL</Text>
              <Text style={styles.subtitle}>Create New Account</Text>
            </View>

            {/* Auth Toggle */}
            <View style={styles.authToggle}>
              <TouchableOpacity 
                style={styles.toggleButton}
                activeOpacity={0.8}
              >
                <Link href={"/(auth)/login"} style={styles.toggleButtonText}>LOGIN</Link>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toggleButton, styles.toggleActive]}
                activeOpacity={0.8}
              >
                <Text style={styles.toggleButtonTextActive}>SIGN UP</Text>
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <View style={[
                styles.inputWrapper,
                isFocused.email && styles.inputFocused
              ]}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={isFocused.email ? "#FF6B35" : "#6b7280"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#6b7280"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                />
              </View>

              <View style={[
                styles.inputWrapper,
                isFocused.password && styles.inputFocused
              ]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={isFocused.password ? "#FF6B35" : "#6b7280"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#6b7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Button */}
            <Animated.View style={[
              styles.accessButton,
              { transform: [{ scale: buttonScale }] }
            ]}>
              <TouchableOpacity
                onPress={handleSignUp}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.7}
                style={styles.buttonInner}
              >
                <Text style={styles.accessButtonText}>CREATE ACCOUNT</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </Animated.View>

            {/* QR Code Authentication */}
            <View style={styles.qrSection}>
              <Text style={styles.qrText}>Or authenticate using your access QR</Text>
              <TouchableOpacity style={styles.qrButton}>
                <Ionicons name="qr-code-outline" size={28} color="#FF6B35" />
                <Text style={styles.qrButtonText}>Scan QR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 10, 10, 0.85)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    marginBottom: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FF6B35",
    textAlign: "center",
    letterSpacing: 2,
    lineHeight: 40,
    marginBottom: 8,
    textShadowColor: "rgba(255, 107, 53, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    letterSpacing: 1,
  },
  authToggle: {
    flexDirection: "row",
    marginBottom: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "rgba(255, 107, 53, 0.2)",
  },
  toggleButtonText: {
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  toggleButtonTextActive: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    backgroundColor: "rgba(30, 30, 36, 0.6)",
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  inputFocused: {
    borderColor: "#FF6B35",
    backgroundColor: "rgba(30, 30, 36, 0.8)",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    paddingVertical: 16,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  passwordToggle: {
    padding: 8,
    marginLeft: 8,
  },
  accessButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF6B35",
    borderRadius: 12,
    marginTop: 20,
    overflow: "hidden",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 25,
  },
  buttonInner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: "rgba(255, 107, 53, 0.1)",
  },
  accessButtonText: {
    color: "#FF6B35",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1.2,
    marginRight: 10,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    textShadowColor: "rgba(255, 107, 53, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  qrSection: {
    alignItems: "center",
    marginTop: 30,
  },
  qrText: {
    color: "#9ca3af",
    fontSize: 14,
    marginBottom: 15,
  },
  qrButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: "#FF6B35",
    borderWidth: 1,
    borderRadius: 8,
  },
  qrButtonText: {
    color: "#FF6B35",
    fontSize: 16,
    fontWeight: "500",
  },
});