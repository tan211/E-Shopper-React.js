import LoginForm from "./Login";
import RegisterForm from "./Register";

function Member() {

    return (
        <>
            <LoginForm/>
            <div class="col-sm-1">
				<h2 class="or">OR</h2>
			</div>
            <RegisterForm/>
        </>
    )
}
export default Member