const writeComment = async (comment) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch("http://localhost:8080/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });

    return response;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};

export { writeComment };
