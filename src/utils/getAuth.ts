
export function getAuth() {
    const email = localStorage.getItem("email")
    if (email) {
        return email
    }
}
