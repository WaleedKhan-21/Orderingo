import React from 'react'
import SideMenu from '../SIdeMenu/SideMenu'

const Account = () => {
  return (
    <div className="content-container">
			<div class="container">
				<div class="heading-bx float-start">
					<h1>Accounts Payable</h1>
				</div>
				
				
				<div class="clearfix"></div>
				
				<div class="row rel-row">
					<div class="d-none d-lg-block side-menu col-lg-3 col-6">
						
						<SideMenu/>
					</div>
					<div class="col-lg-9 col-12 hamb-col vendor-col vendor-col">
						<a class="hamburger-icon2" href="javascript:void(0);"><span></span><span></span><span></span></a>
						<div class="reg-form">
							
							
							<div class="select-d-time float-end">
								<label>Payment Cycles: </label>
								<select class="form-control float-end">
									<option>Jan 1 to Jan 15</option>
									<option>Jan 15 to Jan 30</option>
								</select>
								<select class="form-control float-end">
									<option>2021</option>
								</select>
								
							</div>

							<table class="fancy-table">
								<thead>
									<tr>
										<th>Code</th>
										<th>4000-0001</th>
										<th>5000-0001</th>
										<th>6000-0001</th>
										<th>7000-0001</th>
										<th>8000-0001</th>
										<th>9000-0001</th>
										<th>1000-0001</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td data-title="Code">Name</td>
										<td data-title="4000-0001">Lisa's Kitchen </td>
										<td data-title="5000-0001">Mary Cooking</td>
										<td data-title="6000-0001">Pete Cuisine</td>
										<td data-title="7000-0001">Hary Bakings</td>
										<td data-title="8000-0001">Camila Cooks</td>
										<td data-title="9000-0001">Sherry Foods</td>
										<td data-title="1000-0001">Chris Chef</td>
									</tr>
									<tr>
										<td data-title="Code">T. Order QTY</td>
										<td data-title="4000-0001">100</td>
										<td data-title="5000-0001"></td>
										<td data-title="6000-0001"></td>
										<td data-title="7000-0001"></td>
										<td data-title="8000-0001"></td>
										<td data-title="9000-0001"></td>
										<td data-title="1000-0001"></td>
									</tr>
									<tr>
										<td data-title="Code">T. Order Value</td>
										<td data-title="4000-0001">120</td>
										<td data-title="5000-0001"></td>
										<td data-title="6000-0001"></td>
										<td data-title="7000-0001"></td>
										<td data-title="8000-0001"></td>
										<td data-title="9000-0001"></td>
										<td data-title="1000-0001"></td>
									</tr>
									<tr>
										<td data-title="Code">O Commission</td>
										<td data-title="4000-0001">100</td>
										<td data-title="5000-0001"></td>
										<td data-title="6000-0001"></td>
										<td data-title="7000-0001"></td>
										<td data-title="8000-0001"></td>
										<td data-title="9000-0001"></td>
										<td data-title="1000-0001"></td>
									</tr>
									<tr>
										<td data-title="Code">Delivery Fee</td>
										<td data-title="4000-0001">100</td>
										<td data-title="5000-0001"></td>
										<td data-title="6000-0001"></td>
										<td data-title="7000-0001"></td>
										<td data-title="8000-0001"></td>
										<td data-title="9000-0001"></td>
										<td data-title="1000-0001"></td>
									</tr>
									<tr>
										<td data-title="Code">Service Fee</td>
										<td data-title="4000-0001">50</td>
										<td data-title="5000-0001"></td>
										<td data-title="6000-0001"></td>
										<td data-title="7000-0001"></td>
										<td data-title="8000-0001"></td>
										<td data-title="9000-0001"></td>
										<td data-title="1000-0001"></td>
									</tr>
									<tr>
										<td data-title="Code">Promotion</td>
										<td data-title="4000-0001">100</td>
										<td data-title="5000-0001"></td>
										<td data-title="6000-0001"></td>
										<td data-title="7000-0001"></td>
										<td data-title="8000-0001"></td>
										<td data-title="9000-0001"></td>
										<td data-title="1000-0001"></td>
									</tr>
									<tr>
										<td data-title="Code">Paid D by Cus</td>
										<td data-title="4000-0001">0</td>
										<td data-title="5000-0001"></td>
										<td data-title="6000-0001"></td>
										<td data-title="7000-0001"></td>
										<td data-title="8000-0001"></td>
										<td data-title="9000-0001"></td>
										<td data-title="1000-0001"></td>
									</tr>
									<tr>
										<td data-title="Code">Order Adjust</td>
										<td data-title="4000-0001">0</td>
										<td data-title="5000-0001"></td>
										<td data-title="6000-0001"></td>
										<td data-title="7000-0001"></td>
										<td data-title="8000-0001"></td>
										<td data-title="9000-0001"></td>
										<td data-title="1000-0001"></td>
									</tr>
									<tr>
										<td data-title="Code">T. Payable</td>
										<td data-title="4000-0001">750</td>
										<td data-title="5000-0001"></td>
										<td data-title="6000-0001"></td>
										<td data-title="7000-0001"></td>
										<td data-title="8000-0001"></td>
										<td data-title="9000-0001"></td>
										<td data-title="1000-0001"></td>
									</tr>
									
									
								</tbody>
							</table>

							
							

							

							
							
							<br/>
							<br/>
							<div class="all-btns float-end">
								<a class="orange-bg btn-style cancel-btn" href="javascript:void(0);">
									Cancel
								</a>
								<a class="orange-bg btn-style"  href="javascript:void(0);">
									Add
								</a>
							</div>
							
							
							
						</div>
						

					</div>
				</div>
				
			</div>
			
		</div>

  )
}

export default Account