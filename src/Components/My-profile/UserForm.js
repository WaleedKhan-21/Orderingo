import React, { useState ,useEffect} from 'react'
import Input from '../Uicomponents/Input'
import { Controller } from "react-hook-form";
import CheckBox from '../Uicomponents/CheckBox'
import CustomInput from '../Uicomponents/CustomInput';
import MultiChecks from '../Uicomponents/MultiChecks';
import CustomSelect from '../Uicomponents/CustomSelectBox ';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import slideImg from '../Assets/range.png'
import axios from 'axios';
const categoriesArray = [
    "Weekly Menu",
    "Chinese",
    "Indian",
    "Korean",
    "Arabian",
    "Pakistani",
    "Irani",
    "Thai",
    "Indonesion",
    "South Indian",
    "Bangali"
]
export default function UserForm({ register, onSubmit, errors,control }) {
	const [pcategorey	, setPcategories] = useState([])
    const [reset, setReset] = useState(0);
    const [showRC, setShowRC] = useState(false);
    const [vendorCode, setVenderCode] = useState();
	const [promotionCategory	, setPromotionsCategory] = useState([])
	const [days	, setDays] = useState([
        
    ])
	const [slots	, setSlots] = useState([
        {
            value: "1",
            label: "1pm - 5pm"
        }
    ])
      const handleShowRC = (value) =>{
        // alert(value)
        if(value=== "Yes"){
            setShowRC(true)
        } else if(value === "No"){
            setShowRC(false)
        }
      }
    useEffect(() => {
        (async()=>{
         
            await axios.get('http://localhost:1337/preferred-categories').then(res => {
                                                      const optionsCat = res.data.map((_)=>{
                return {value:_.id,label:_.Name}
              }
              )
              setPcategories(optionsCat)
            }	).catch(err => {
                console.log(err)
            }
            )
            await axios.get('http://localhost:1337/delivery-days').then(res => {
                                                      const optionsCat = res.data.map((_)=>{
                return {value:_.id,label:_.DaysName}
              }
              )
              setDays(optionsCat)
            }	).catch(err => {
                console.log(err)
            }
            )
           
            await axios.get('http://localhost:1337/promotions').then(res => {
                                                      const optionsCat = res.data.map((_)=>{
                return {value:_.id,label:_.name}
              }
              )
              setPromotionsCategory(optionsCat)
            }	).catch(err => {
                console.log(err)
            }
            )
            
        
        })()
        
        
        }, [])
        function onChange(value) {
            console.log(value && value.format("h:mm a"));

        }
        useEffect(() => {
            console.log("reload")
          },[reset]);
          useEffect(() => {
            setVenderCode(localStorage.getItem("vendorCode"))
           
           },[]);
        
    return (
        <>
            <form onSubmit={onSubmit} >
            {vendorCode?
            (<Input id="VendorCode" label='Vendor Code' errors={errors} value={vendorCode} disabled={true} register={register} name="VendorCode" />)
                :
                (<Input id="VendorCode" label='Vendor Code' errors={errors} disabled={true} register={register} name="VendorCode" />)
            }
                <Input id="VendorCode" label='User Name' req={true} errors={errors} register={register} name="username" />
                <Input id="fullname" label='First Name' req={true} errors={errors} register={register} name="FirstName" />
                <Input id="lastname" label='Last Name' req={true} errors={errors} register={register} name="LastName" />
                <Input id="Email" label='Email' req={true} register={register} errors={errors} name="email" />
                <Input id="Password" label='Password:' register={register} errors={errors} name="password" type='password' />
                <Input id="confirmPassword" label='Confirm Password:' register={register} errors={errors} name="confirmPassword" type='password' />
                <Input id="CellPhone" label='Cell Phone' req={true} register={register} errors={errors} name="Cellphone" />
                <Input id="Inerac" label='Interac Email' req={true} register={register} errors={errors} name="IneracEmail" />
                <Input id="HomePhone" label='Home Phone' register={register} errors={errors} name="Homephone" />
                <div class="mb-3 row">
                    <label for="" class="col-sm-3 col-form-label">Home Address</label>
                    <div class="col-sm-9">
                        <div class="checkout-form-bx checkout-form-bx2">
                            {/* <CheckBox type={"radio"} label='Apartment / Condo / Building' labelFor='Apartment' register={register} value={"Appartment"} name="flexRadioDefault3" />
                            <CheckBox type={"radio"} label='House' labelFor='House' value={"House"} register={register} name="flexRadioDefault3" /> */}
                        </div>
                        <div class="checkout-form-inputs">
                            <div class="form-group">
                                <CustomInput id="HomePhone" placeholder="street"  register={register} name="addresses" />
                            </div>
                            <div class="form-group"> <CustomInput placeholder="Unit No."  register={register} name="unitNo" /></div>
                            <div class="form-group">
                                <CustomInput placeholder="City"  register={register} name="city" />
                            </div>
                            <div class="form-group"><CustomInput placeholder="Postal Code" register={register} name="postalCode" /></div>
                            <div class="form-group">
                                <CustomInput placeholder="Province"   register={register} name="province" />
                            </div>

                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="confirmPassword" class="col-sm-3 col-form-label">Pickup Addres<span>*</span></label>
                    <div class="col-sm-9">
                        <CheckBox id={'flexCheck2'} labelClass={'form-check-label'} label={'Same as Home Address'}  register={register} name="sameAsHome" value={true} />
                        <div class="checkout-form-bx checkout-form-bx2">
                            <div class="form-check float-start">
                                {/* <CheckBox type={"radio"} label='Apartment / Condo / Building' labelFor='Apartment' register={register} value={"Appartment"} name="flexRadioDefault3" /> */}
                            </div>
                            <div class="form-check float-start">
                                
                                {/* <CheckBox type={"radio"} label='House' labelFor='House' value={"House"} register={register} name="flexRadioDefault3" /> */}
                            </div>
                        </div>
                        <div class="checkout-form-inputs">
                            <div class="form-group">
                                <CustomInput id="HomePhone" placeholder="street" errors={errors} register={register} name="secondaryContactsPhone" />
                            </div>
                            <div class="form-group">
                            <CustomInput placeholder="Unit No."  errors={errors} register={register} name="unitNo" />
                            </div>
                            <div class="form-group">
                               
                                <CustomInput placeholder="City" errors={errors} register={register} name="city" />
                            </div>
                            <div class="form-group">
                            <CustomInput placeholder="Postal Code" errors={errors} register={register} name="postalCode" />
                            </div>
                            <div class="form-group">
                                <CustomInput placeholder="Province"  errors={errors} register={register} name="province" />
                            </div>
                        </div>
                    </div>
                </div>
                <h1>Store Information</h1>
                <hr/>
                <Input id="storeName" label='Store Name' req={true} errors={errors}  register={register} name="StoreName" />
                <Input id="Experience" label='Cooking Experience' errors={errors}  register={register} placeholder="cooking experiance in years" name="cooking_experience" />
								<CustomSelect control={control}  options={pcategorey } id="categorey" req={true}  label='product category' errors={errors} register={register} name="preferred_categories" />
                                <CustomSelect control={control} options={[{ value: "1", label: "Daily" },{ value: "1", label: "Weekly" }, { value: "1", label: "Special Offer" }]} id="promotion" label='promotion type'  register={register} name="promotion_type" />
								{/* <CustomSelect control={control} options={promotionCategory } id="promotion" label='promotion type' errors={errors} register={register} name="promotion_type" /> */}
								{/* <CustomSelect control={control} options={days } id="days" label='Delivery Days' errors={errors} register={register} name="delivery_days" /> */}
								{/* <CustomSelect control={control} options={slots } id="slots" label='Slots' errors={errors} register={register} name="delivery_days" /> */}
                                <div class="mb-3 row">
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
								</div>

                {/* <div class="mb-3 row">
                    <label for="fullname" class="col-sm-3 col-form-label">Available days</label>
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
                <div class="mb-3 row">
                    <label for="" class="col-sm-3 col-form-label">Delivers<span>*</span></label>
                    <div class="col-sm-9">
                        <div class="checkout-form-bx checkout-form-bx2">
                            <CheckBox type={"radio"} label='Yes' labelFor='yes' errors={errors} handleShowRC={handleShowRC} value={"Yes"} register={register} name="delivers" />
                            <CheckBox type={"radio"} label='No' labelFor='no' errors={errors} handleShowRC={handleShowRC} value={"No"} register={register} name="delivers" />
                        </div>
                    </div>
                </div>
                {showRC ? <div class="mb-3 row">
                    <label for="HomePhone" class="col-sm-3 col-form-label">Delivery Radius<span>*</span></label>
                    <div class="col-sm-9">
                        <img src={slideImg} alt="" />
                    </div>
                </div> : ""}
                <div class="mb-3 row">
                    <label for="" class="col-sm-3 col-form-label">Scale<span>*</span></label>
                    <div class="col-sm-9">
                        <div class="checkout-form-bx checkout-form-bx2">
                            <CheckBox type={"radio"} label='Industrial' labelFor='Industrial' errors={errors} value={"Industrial"} register={register} name="delivers2" />
                            <CheckBox type={"radio"} label='Home' labelFor='Home' errors={errors} value={"Home"} register={register} name="delivers2" />
                        </div>
                    </div>
                </div>
                <Input id="Secondary" req={true} label='Secondary Contact' register={register} errors={errors} name="secondaryContact" />
                <div class="all-btns float-end">
                    <button class="orange-bg btn-style cancel-btn" onClick={(prev)=>(setReset(prev + 1))} type='reset' >
                        Cancel
                    </button >
                    <button class="orange-bg btn-style" type='submit'>
                        Save
                    </button>
                </div>
            </form>
        </>



    )
}
/*  */
