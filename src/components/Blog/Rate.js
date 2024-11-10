import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react"; 
import { useParams } from 'react-router-dom';
import api from '../api';

function Rate(props){
    const [rating, setRating] = useState(0)

    const params = useParams()

    let url = '/blog/rate/' + params.id

    useEffect(()=>{
        api.get('blog/rate/' + params.id)
		.then(response => {
			console.log(response.data.data)
			let data = response.data.data
            if (data && data.length > 0) {
                let sum = 0
                data.map((value, key)=>{
                sum += data[key]["rate"]
                })
                let x = sum / data.length
                console.log(x)
                setRating(x)
            }
		})
		.catch(function(error){
			console.log(error)
		})
    },[])


    function changeRating( newRating, name ) {
        if (localStorage.getItem("appState")) {
            setRating(newRating)
            console.log(newRating)
            const userData = JSON.parse(localStorage.getItem("appState"))
            let accessToken = userData.token
            let config = { 
                    headers: { 
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
            }
            if (newRating > 0) {
                const formData = new FormData()
                    formData.append('user_id', userData.Auth.id)
                    formData.append('blog_id', params.id)
                    formData.append('rate', newRating)
                    api.post(url, formData, config)
                    .then(response => {
                        console.log(response)
                    })
                    console.log(formData)
            }
    
        } else {
            alert("Please Login")
        }
    }
    return (
        <StarRatings
        rating={rating}
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={6}
        name='rating'
        />
    );
}
export default Rate