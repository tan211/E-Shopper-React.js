import { Link } from "react-router-dom"

function MenuAcc() {
    let xx = JSON.parse(localStorage.getItem("appState"))
    xx = xx.Auth.id
    return (
        <>
            	<div class="col-sm-3">
					<div class="left-sidebar">
						<h2>Account</h2>
						<div class="panel-group category-products" id="accordian">
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><Link to={"/account/user/update/" + xx}>account</Link></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><Link to="/account/user/product/list">My product</Link></h4>
								</div>
							</div>
							
						</div>
					</div>
				</div>
        </>
    )
}
export default MenuAcc