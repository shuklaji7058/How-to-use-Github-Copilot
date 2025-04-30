const { test, expect } = require("@jest/globals");

test("hello world!", () => {
  expect(1 + 1).toBe(2);
});
const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

describe("Regex Validation", () => {
  test("Valid string passes the regex", () => {
    const validString = "Password1@";
    expect(regex.test(validString)).toBe(true);
  });

  test("String without uppercase fails", () => {
    const noUppercase = "password1@";
    expect(regex.test(noUppercase)).toBe(false);
  });

  test("String without digit fails", () => {
    const noDigit = "Password@";
    expect(regex.test(noDigit)).toBe(false);
  });

  test("String without special character fails", () => {
    const noSpecialChar = "Password1";
    expect(regex.test(noSpecialChar)).toBe(false);
  });

  test("String shorter than 8 characters fails", () => {
    const shortString = "Pass1@";
    expect(regex.test(shortString)).toBe(false);
  });
});
