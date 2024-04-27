import permission from "./permission";
import print from "vue3-print-nb";
import copyText from "./copyText";

export default app => {
	// app.use(print);
	// app.directive("auth", permission);
	app.directive("copyText", copyText);
};