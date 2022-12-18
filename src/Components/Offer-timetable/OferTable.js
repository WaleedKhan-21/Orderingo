import React, { useState, useEffect } from 'react'
import image from "../Assets/upload-img.jpg";
import SideMenu from '../SIdeMenu/SideMenu';
import Input from '../Uicomponents/Input';
/* Importing the SelectBox component from the Uicomponents folder. */
// import Select from '../Uicomponents/SelectBox';
import TextArea from '../Uicomponents/TextArea'
import MultiChecks from '../Uicomponents/MultiChecks';
import CheckBox from '../Uicomponents/CheckBox';
import CustomSelect from '../Uicomponents/CustomSelectBox ';
import Select from 'react-select'
import useFetch from '../../hooks/dropdowns';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from "yup";
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import 'rc-time-picker/assets/index.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const OferTable = (child) => {
	const navigate = useNavigate()
	// const {data:days} = useFetch('http://localhost:1337/delivery-days')
	// const {data:stores} = useFetch('http://localhost:1337/stores')
	// const {data:categorey} = useFetch('http://localhost:1337/menu-categories')
	// const {data:pcategorey} = useFetch('http://localhost:1337/preferred-categories')
	// const {data:properties} = useFetch('http://localhost:1337/product-properties')
	// const {data:size} = useFetch('http://localhost:1337/product-sizes')

	// console.log("=================",deliveryDays)
	const [days, setDays] = useState([])
	const [stores, setStores] = useState([])
	const [categorey, setcategories] = useState([])
	const [pcategorey, setPcategories] = useState([])

	const [properties, setProperties] = useState([])
	const [isActive, setIsActive] = useState(false)
	const [imageID, setImageID] = useState(null)
	const [size, setSize] = useState([])
	const [products, setProducts] = useState([])
	const [serve, setServe] = useState("")
	const [check, setCheck] = useState()
	const [slots, setSlots] = useState([
		{
			value: "1",
			label: "1pm - 5pm"
		}
	])
	const [packings, setpackings] = useState([{ label: "Box", value: "1" }, { label: "Plate", value: "2" }, { label: "Paper bag", value: "3" }])

	const offerSchema = yup.object({
		name: yup.string().required("Offering Name is Required"),
		fullName:yup.string().required("Single serving Price Name is Required"),
		vendorCode:yup.string().required("Promotional Price is Required"),
		description: yup.string().required(),
		promotion_types: yup.array().min(1, "promtion types are required").required("required"),
		// offerimage:yup.string().required(),
		products: yup.array().min(1, "products are required").required("required"),
		// file: yup.mixed().required('A file is required'),
		// product_size_price: yup.array().min(1, "promtion types are required").required("required"),
		delivery_days: yup.array().min(1, "delivery days are required").required("required"),
		


	}).required();

	const { register, getValues, handleSubmit, formState: { errors }, control } = useForm({
		resolver: yupResolver(offerSchema)
	});

	useEffect(() => {
        console.log(localStorage.getItem("token"))
        if(localStorage.getItem("token")){
            console.log("profile landing")
        } else {
            localStorage.clear();
            navigate("/");
        }
      },[]);
	const handler = async (e) => {
        if(check && serve){
			const { name, description, product_size_price, promotion_types, delivery_days,products } = e
			const offerimage = imageID
	
			const payload = {
				name, description,
				promotion_types,
				offerimage,
				product_size_price,
				delivery_days
	
			}
			const promotionDetailPayload = {
				products,
			}
	
			await axios.post('http://localhost:1337/promotions', payload).then(res => {
	
				toast.success("Added to promotions")
				// navigate("/details")
	
			}).catch(err => {
				console.log(err)
			}
			)
			await axios.post('http://localhost:1337/promotion-details', payload).then(res => {
	
				toast.success("Added to promotions details")
			 
	
			}).catch(err => {
				toast.error(err)
			}
			)
		}else{
			toast.error("kindly upload dish picture or Serve filed required")
		}
		


	}
	//DropDowns
	useEffect(() => {
		(async () => {
			await axios.get('http://localhost:1337/delivery-days').then(res => {
				const optionsCat = res.data.map((_) => {
					return { value: _.id, label: _.DaysName }
				}
				)
				setDays(optionsCat)
			}).catch(err => {
				toast.error(err)
			}
			)
			await axios.get(`http://localhost:1337/products/${localStorage.getItem("id")}`).then(res => {
				const optionsCat = res.data.map((_) => {
					return { value: _.id, label: _.productName }
				}
				)
				setProducts(optionsCat)
			}).catch(err => {
				console.log(err)
			}
			)
			await axios.get('http://localhost:1337/product-properties').then(res => {
				const optionsCat = res.data.map((_) => {
					return { value: _.id, label: _.name }
				}
				)
				setProperties(optionsCat)
			}).catch(err => {
				console.log(err)
			}
			)
			await axios.get('http://localhost:1337/stores').then(res => {
				const options = res.data.map((_) => {
					return { value: _.id, label: _.StoreName }
				}
				)
				setStores(options)
			}).catch(err => {
				console.log(err)
			}
			)
			await axios.get('http://localhost:1337/menu-categories').then(res => {
				const optionsCat = res.data.map((_) => {
					return { value: _.id, label: _.Name }
				}
				)
				setcategories(optionsCat)
			}).catch(err => {
				console.log(err)
			}
			)
			await axios.get('http://localhost:1337/preferred-categories').then(res => {
				const optionsCat = res.data.map((_) => {
					return { value: _.id, label: _.Name }
				}
				)
				setPcategories(optionsCat)
			}).catch(err => {
				console.log(err)
			}
			)
			await axios.get('http://localhost:1337/product-sizes').then(res => {
				const optionsCat = res.data.map((_) => {
					return { value: _.id, label: _.name }
				}
				)
				setSize(optionsCat)
			}).catch(err => {
				console.log(err)
			}
			)

		})()


	}, [])
	function onChange(value) {
		console.log(value && value.format("h:mm a"));
	}
	const handleUpload = async (e) => {
		setCheck(e.target.files)
		console.log("je", e.target.files)
		const arr = Array.from(e.target.files);
		const formData = new FormData()
		arr.map((_) => {

			formData.append('files', _)
		})
		await axios.post('http://localhost:1337/auth/local', {
			identifier: "shahzi113awan@gmail.com",
			password: "456sshahzai"
		}).then(async (res) => {
			var config = {
				method: 'post',
				url: 'http://localhost:1337/upload',
				headers: {
					'Authorization': `Bearer ${res.data.jwt}`,

				},
				data: formData
			};
			await axios(config).then(res => {
				console.log(res)
				setImageID(res.data[0].id)
			}).catch(err => {
				console.log(err)
			}
			)
		}).catch(err => {
			console.log(err)
		}
		)
	}

 

	return (
		<div class="content-container">
			<ToastContainer />
			<div class="container">
				<div class="heading-bx float-start">
					<h1>Offering / Time Table</h1>
				</div>


				<div class="clearfix"></div>

				<div class="row">
					<div class="d-none d-lg-block side-menu col-lg-3 col-6">

						<SideMenu child={child} />
					</div>
					<div class="col-lg-9 col-12 hamb-col cate-col vendor-col">
						<form onSubmit={handleSubmit(handler)}>
							<a class="hamburger-icon2" href="javascript:void(0);"><span></span><span></span><span></span></a>
							<div class="reg-form reg-form2 w80">
								{/* <Input id="VendorCode" placeholder="(Vendor Code) 4000 - (Item Code) 000001" label='Offering Code' errors={errors} register={register} name="vendorCode" /> */}
								<Input id="VendorCode" label='Offering Name' errors={errors} register={register} name="name" />

								<div class="mb-3 row">
									<label for="serve" class="col-sm-3 col-form-label">Serve</label>
									<Select className='col-sm-9'    options={size} onChange={e => { setServe(e.value) }} name="product_size_price" />

								</div>
								{/* <div class="mb-3 row">
								<label for="" class="col-sm-3 col-form-label">Offering</label>
								<div class="col-sm-9">
									<div class="checkout-form-bx checkout-form-bx2">
									<MultiChecks type='radio' checkArray={["Weekly Menu", "Special Offer"]} register={register} name="prefferedCategory" />
									</div>
								</div>
							</div> */}
								{/* <CustomSelect control={control} options={[{ value: "1", label: "Daily Menu" }, { value: "1", label: "Weekly" }, { value: "1", label: "Special Offer" }]} id="categorey" label='Promotion Type' errors={errors} register={register} name="promotion_types" /> */}
								<CustomSelect control={control} options={[{ value: "1", label: "Weekly" }, { value: "1", label: "Special Offer" }]} id="categorey" label='Promotion Type' errors={errors} register={register} name="promotion_types" />
								<CustomSelect control={control} options = {products} id="categorey" label='Products' errors={errors} register={register} name="products" />


								{/* <div class="mb-3 row">
									<label for="fullname" class="col-sm-3 col-form-label">Offers</label>
									<div class="col-sm-9">
										<table class="fancy-table">
											<thead>
												<tr>
													<th>Dishes</th>


													<th>Free</th>
													<th>Price</th>
													<th>Category</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td data-title="Dishes">
														<select class="form-control">
															<option>Biryani</option>
															<option>Pulao</option>
														</select>
													</td>


													<td data-title="Free"><input class="form-check-input" type="checkbox" value="" id="" checked="" /></td>
													<td data-title="Price">20</td>
													<td data-title="Category">Chines</td>
												</tr>
												<tr>
													<td data-title="Dishes">
														<select class="form-control">
															<option>Biryani</option>
															<option>Pulao</option>
														</select>
													</td>


													<td data-title="Free"><input class="form-check-input" type="checkbox" value="" id="" checked="" /></td>
													<td data-title="Price">20</td>
													<td data-title="Category">Chines</td>
												</tr>
												<tr>
													<td data-title="Dishes">
														<select class="form-control">
															<option>Biryani</option>
															<option>Pulao</option>
														</select>
													</td>


													<td data-title="Free"><input class="form-check-input" type="checkbox" value="" id="" checked="" /></td>
													<td data-title="Price">20</td>
													<td data-title="Category">Chines</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div> */}
							 

								{serve== "2x" ? <Input id="fullName" placeholder="%CAD" label='Double Serving' errors={errors} register={register} name="fullName" />:<Input id="fullName" placeholder="%CAD" label='Single serving Price' errors={errors} register={register} name="fullName" />
									 }

								<Input id="fullName" placeholder="%CAD" label='Promotional Price' errors={errors} register={register} name="vendorCode" />
								<CustomSelect control={control} options={days} id="days" label='Delivery Days' errors={errors} register={register} name="delivery_days" />



								{/* <div class="mb-3 row">
									<label for="" class="col-sm-3 col-form-label">Store open time</label>
									<div class="col-sm-3">
										<TimePicker
											showSecond={false}
											defaultValue={moment().hour(0).minute(0)}
											className="xxx"
											onChange={onChange}
											format={"h:mm a"}
											use12Hours
											inputReadOnly
										/>
									</div>
								</div>
								<div class="mb-4 row">
									<label for="" class="col-sm-3 col-form-label">Store close time</label>
									<div class="col-sm-3">
										<TimePicker
											showSecond={false}
											defaultValue={moment().hour(0).minute(0)}
											className="xxx"
											onChange={onChange}
											format={"h:mm a"}
											use12Hours
											inputReadOnly
										/>
									</div>
								</div> */}


								{/* <div class="mb-3 row">
								<label for="fullname" class="col-sm-3 col-form-label">Time Table</label>
								<div class="col-sm-9">
                        <table class="fancy-table">
                            <thead>
                                <tr>
                                    <th>Days</th>
                                    <th>Availability</th>
                                    <th>Time Slot</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-title="Days">Monday</td>
                                    <td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"Monday"} />
                                    </td>
                                    <td data-title="Time Slot">1pm - 5pm</td>
                                </tr>
                                <tr>
                                    <td data-title="Days">Tuesday</td>
                                    <td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"Tuesday"} />
                                    </td>
                                    <td data-title="Time Slot">1pm - 5pm</td>
                                </tr>
                                <tr>
                                    <td data-title="Days">Wednesday</td>
                                    <td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"Wednesday"} />
                                    </td>
                                    <td data-title="Time Slot">1pm - 5pm</td>
                                </tr>
                                <tr>
                                    <td data-title="Days">Thursday</td>
                                    <td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"Thursday"} />
                                    </td>
                                    <td data-title="Time Slot">1pm - 5pm</td>
                                </tr>
                                <tr>
                                    <td data-title="Days">Friday</td>
                                    <td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"Friday"} />
                                    </td>
                                    <td data-title="Time Slot">1pm - 5pm</td>
                                </tr>
                                <tr>
                                    <td data-title="Days">Saturday</td>
                                    <td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"Saturday"} />
                                    </td>
                                    <td data-title="Time Slot">1pm - 5pm</td>
                                </tr>
                                <tr>
                                    <td data-title="Days">Sunday</td>
                                    <td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"Sunday"} />
                                    </td>
                                    <td data-title="Time Slot">1pm - 5pm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
							</div> */}
								<TextArea id="VendorCode" placeholder="Type Message" label='Special Message' errors={errors} register={register} name="description" />
								<div class="mb-3 row">
									<label for="fullname" className="col-sm-3 col-form-label">Add Dish Picture</label>
									<div class="col-sm-9">
										<input multiple type={"file"} onChange={e => handleUpload(e)} />
										{/* <div class="upload-btns">
										<a class="float-start u-add" href="javascript:void(0);">Add</a>
										<a class="float-end u-remove" href="javascript:void(0);">Remove</a>
									</div> */}
									</div>
								</div>
								{/* <div class="mb-3 row">
								<label for="fullname" class="col-sm-3 col-form-label">Add Dish Picture</label>
								<div class="col-sm-9">
									<img src={image} />
									<div class="upload-btns">
										<a class="float-start u-add" href="javascript:void(0);">Add</a>
										<a class="float-end u-remove" href="javascript:void(0);">Remove</a>
									</div>
								</div>
							</div> */}


								<div class="all-btns float-end">
									<button class="orange-bg btn-style cancel-btn" href="javascript:void(0);">
										Cancel
									</button>
									<button type='submit' class="orange-bg btn-style" href="javascript:void(0);">
										Add
									</button>
								</div>



							</div>
							{/* <div class="add-items-bx">
								<a class="orange-bg btn-style" href="javascript:void(0);">Add Offering</a>
								<br /><br />
								<div class="form-check">
									<input class="form-check-input" type="checkbox" value="" id="Active" checked="" />
									<label class="form-check-label" for="Active">Active</label>
								</div>
							</div> */}

						</form>
					</div>
				</div>
			</div>

		</div>
	)
}

export default OferTable