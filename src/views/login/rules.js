export const validatePassword = () => {
	return (rule, value, callback) => {
		if (value.length < 6 || value!=="123456") {
			callback(new Error("密码错误"));
		} else {
			callback();
		}
	};
};

export const validateCode = () => {
	return (rule, value, callback) => {
		if (value.length < 4) {
			callback(new Error("验证码不能少于4位"));
		} else {
			callback();
		}
	};
};