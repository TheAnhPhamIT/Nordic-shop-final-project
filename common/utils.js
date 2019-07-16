exports.validateUsername = username => {
    test('validate username', username => {
        expect(username).toMatch(/^[a-z0-9_-]{3,16}$/);
    });
}

exports.validateEmail = email => {
    test('validate email', email => {
        expect(email).toMatch(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    });
}
