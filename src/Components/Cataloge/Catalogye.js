import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm, } from 'react-hook-form';
import * as yup from "yup";
import SideMenu from '../SIdeMenu/SideMenu';
import CheckBox from '../Uicomponents/CheckBox';
import Input from '../Uicomponents/Input';
import MultiChecks from '../Uicomponents/MultiChecks';
import Select from '../Uicomponents/SelectBox';
import CustomSelect from '../Uicomponents/CustomSelectBox ';
import { ToastContainer, toast } from 'react-toastify';
import TextArea from '../Uicomponents/TextArea';
import ErrorMessage from '../Uicomponents/ErrorMessage';
import 'react-toastify/dist/ReactToastify.css';
import { resetWarningCache } from 'prop-types';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import Switch from 'react-switch'
import { useNavigate } from 'react-router-dom';
const Catalogye = (child) => {
	let navigate = useNavigate();
	const [stores, setStores] = useState([])
	const [categorey, setcategories] = useState([])
	const [pcategorey, setPcategories] = useState([])
	const [days, setDays] = useState([])
	const [properties, setProperties] = useState([])
	const [isActive, setIsActive] = useState(false)
	const [imageID, setImageID] = useState(null)
	const [slots, setSlots] = useState([
		{
			value: "1",
			label: "1pm - 5pm"
		}
	])
	const [packings, setpackings] = useState([{ label: "Box", value: "1" }, { label: "Plate", value: "2" }, { label: "Paper bag", value: "3" }])
	const catalougeSchema = yup.object({
		vendorCode: yup.string().required(),
		product_category: yup.array().min(1, "product category are required").required("required"),
		delivery_days: yup.array().min(1, "delivery days are required").required("Delivery Days are required").nullable(),
		packingings: yup.array().min(1, "packing are required").required("required"),
		description: yup.string().required(),
		Price: yup.string().required(),

	}).required();
	const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
		resolver: yupResolver(catalougeSchema),
		defaultValues: {
			name: localStorage.getItem("productName"),
			price: localStorage.getItem("dishPrice"),
		}
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
		let { stores, product_category, description, delivery_days, productProperty1, packingings, name, price, is_daily_menu_available ,Price} = e
		console.log(stores)
		const prefferedCategories = ["1"]
		product_category = [...product_category]
		const offerimage = imageID
		const payload = {
			promotion_types:["1"],
			product_category, description, delivery_days, productProperty1, packingings, stores, name, price, prefferedCategories, stores, is_daily_menu_available,isActive,offerimage
		}

		const productPayload  = {
			productName : name,
			description,
			delivery_days,
			productimagee:offerimage,
			Price,
	
			}
		await axios.post('http://localhost:1337/products', productPayload).then(res => {
	 
			 toast.success("product added successfully")
			// navigate("/details")

		}).catch(err => {
			console.log(err)
		}
		)
		await axios.post('http://localhost:1337/promotions', payload).then(res => {
			toast.success("promotion added successfully")
			reset();
		}).catch(err => {
			console.log(err)
		}
		)


	}
	useEffect(() => {
		(async () => {
			await axios.get('http://localhost:1337/delivery-days').then(res => {
				const optionsCat = res.data.map((_) => {
					return { value: _.id, label: _.DaysName }
				}
				)
				setDays(optionsCat)
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

		})()


	}, [])
	function onChange(value) {
		console.log(value && value.format("h:mm a"));
	}
	function isActiveHandler(value) {
		console.log(value);
		setIsActive(value)
	}

	const handleUpload = async(e) => { 
		console.log("je",e.target.files)
		const arr = Array.from(e.target.files);
		const formData = new FormData()
		arr.map((_)=>{

			formData.append('files',_)
		})
		await axios.post('http://localhost:1337/auth/local',{identifier: "shahzi113awan@gmail.com",
		password: "456sshahzai"}).then(async(res) => {
			var config = {
				method: 'post',
				url: 'http://localhost:1337/upload',
				headers: { 
				  'Authorization': `Bearer ${res.data.jwt}`, 
				 
				},
				data : formData
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
					<h1>Menu / Catalogue Registeration</h1>
				</div>


				<div class="clearfix"></div>

				<div class="row rel-row">
					<div class="d-none d-lg-block side-menu col-lg-3 col-6">
						<SideMenu child={child} />
					</div>
					<div class="col-lg-9 col-12 hamb-col vendor-col cate-col">
						<a class="hamburger-icon2" href="javascript:void(0);"><span></span><span></span><span></span></a>
						<div class="reg-form reg-form2 w80">
							<form onSubmit={handleSubmit(handler)}>
								<div class="mb-3 row">
									<label for="" class="col-sm-3 col-form-label">is Active</label>
									<div class="col-sm-3">
										<Switch onChange={isActiveHandler} checked={isActive} />
									</div>
								</div>
								<Input id="VendorCode" placeholder="(Vendor Code) 4000 - (Item Code) 000001" label='Item Code' errors={errors} register={register} name="vendorCode" />
								<Input id="fullname" label='Dish Name' errors={errors} register={register} name="name" />
								<Input id="price" label='Price' errors={errors} register={register} name="Price" />
								
								<div class="mb-3 row">
									<label for="" class="col-sm-3 col-form-label">available for daily menu</label>
									<div class="col-sm-9">
										<div class="checkout-form-bx checkout-form-bx2">
											<CheckBox id={'productProperty1'} label='' labelFor='yes' value={true} register={register} name="is_daily_menu_available" />
											{/* <CheckBox id={'productProperty1'} label='No' labelFor='no' value={""} register={register} name="productProperty1" /> */}
										</div>
									</div>
								</div>
								{/* <Select options={["chinese", "pakistani", "Korean"]} id="categorey" label='Category' errors={errors} register={register} name="dishName" /> */}
								<CustomSelect control={control} options={categorey} id="categorey" label='Product Category' errors={errors} register={register} name="product_category" />
								{/* <CustomSelect control={control} options={stores} id="categorey" label='Stores' errors={errors} register={register} name="stores" /> */}
								{/* multichecks example */}
								{/* <div class="mb-3 row">
									<label for="CellPhone" class="col-sm-3 col-form-label">Preffered Category</label>
									<div class="col-sm-9">
									<MultiChecks mainDivClass='form-check' checkArray={pcategorey} register={register} name="preffered" />
									<div class="clearfix"></div>
									
									</div>
								</div> */}
								<TextArea id="Ingredients" label='Ingredients' errors={errors} register={register} name="Ingredients" />
								<TextArea id="Allergen" label='Allergen' errors={errors} register={register} name="description" />
								<CustomSelect control={control} options={pcategorey} id="categorey" label='Preffered Category' errors={errors} register={register} name="preffered" />
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

								{/* <CustomSelect control={control} options={slots} id="slots" label='store open time' errors={errors} register={register} name="delivery_days" />
								<CustomSelect control={control} options={slots} id="slots" label='store close time' errors={errors} register={register} name="delivery_days" /> */}
								{/* Table example */}
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
													<td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"1"} />
													</td>
													<td data-title="Time Slot">1pm - 5pm</td>
												</tr>
												<tr>
													<td data-title="Days">Tuesday</td>
													<td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"2"} />
													</td>
													<td data-title="Time Slot">1pm - 5pm</td>
												</tr>
												<tr>
													<td data-title="Days">Wednesday</td>
													<td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"3"} />
													</td>
													<td data-title="Time Slot">1pm - 5pm</td>
												</tr>
												<tr>
													<td data-title="Days">Thursday</td>
													<td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"4"} />
													</td>
													<td data-title="Time Slot">1pm - 5pm</td>
												</tr>
												<tr>
													<td data-title="Days">Friday</td>
													<td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"5"} />
													</td>
													<td data-title="Time Slot">1pm - 5pm</td>
												</tr>
												<tr>
													<td data-title="Days">Saturday</td>
													<td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"6"} />
													</td>
													<td data-title="Time Slot">1pm - 5pm</td>
												</tr>
												<tr>
													<td data-title="Days">Sunday</td>
													<td data-title="Availability">                        <CheckBox id={'flexCheck2'} register={register} name="delivery_days" value={"7"} />
													</td>
													<td data-title="Time Slot">1pm - 5pm</td>
												</tr>
											</tbody>
										</table>
										{errors && errors["delivery_days"] && <ErrorMessage message={errors["delivery_days"].message}/>}
									</div>
								</div> */}
								<CustomSelect control={control} options={properties} id="properties" label='Product properties' errors={errors} register={register} name="productProperty1" />

								{/* checkBox example */}
								{/* <div class="mb-3 row">
									<label for="" class="col-sm-3 col-form-label">Halal</label>
									<div class="col-sm-9">
										<div class="checkout-form-bx checkout-form-bx2">
											<CheckBox id={'productProperty1'} label='Yes' labelFor='yes' value={"1"} register={register} name="productProperty1" />
											<CheckBox id={'productProperty1'} label='No' labelFor='no' value={""} register={register} name="productProperty1" />
										</div>
									</div>
								</div> */}
								<CustomSelect control={control} options={packings} id="packings" label='Packaging' errors={errors} register={register} name="packingings" />

								<div class="mb-3 row">
									<label for="fullname" class="col-sm-3 col-form-label">Add Dish Picture</label>
									<div class="col-sm-9">
										<input multiple type={"file"} onChange={e=>handleUpload(e)} />
										{/* <div class="upload-btns">
										<a class="float-start u-add" href="javascript:void(0);">Add</a>
										<a class="float-end u-remove" href="javascript:void(0);">Remove</a>
									</div> */}
									</div>
								</div>


								<div class="all-btns float-end">
									<a class="orange-bg btn-style cancel-btn" href="javascript:void(0);">
										Cancel
									</a>
									<button type='submit' class="orange-bg btn-style">
										Add
									</button>
								</div>



								{/* <button type='submit' class="orange-bg btn-style" href="javascript:void(0);">Add Item</button> */}
							</form>
						</div>
						<div class="add-items-bx">
							<br /><br />
							<div class="form-check">
								{/* <input class="form-check-input" type="checkbox" value="" id="Active" checked="" />
								<label class="form-check-label" for="Active">Active</label> */}
							</div>
						</div>

					</div>
				</div>

			</div>

		</div>

	)
}

export default Catalogye