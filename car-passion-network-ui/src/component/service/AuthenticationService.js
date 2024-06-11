const registerUser = async (inputValues) => {
  try {
    const response = await fetch(
      "http://localhost:8080/authentication/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      }
    );

    return response;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};

export { registerUser };
