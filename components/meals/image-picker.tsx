
'use client'
import classes from './image-picker.module.css'
import { useRef, useState } from 'react';
import Image from 'next/image';

export default function ImagePicker({ label, name } : {label:string, name :string}) {
    const [pickedImage, setPickedImage] = useState<string | null>(null)
    const imageInput = useRef<HTMLInputElement | null>(null);

    function handlePickClick() {
        if (imageInput.current) {
            imageInput.current.click()
        }

    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]

        if (!file) {
            setPickedImage(null);
            return
        }

        const fileReader = new FileReader();
        fileReader.onload = ()=>{
            const result = fileReader.result
            if (typeof result === 'string') {
                setPickedImage(result)
            }
        };
        fileReader.readAsDataURL(file);
    }
    
    return (
        <>
            <div className={classes.picker}>
                <label htmlFor={name}>{label}</label>

            <div className={classes.controls}>
        <div className={classes.preview}>
            {!pickedImage && <p>No image picked yet.</p>}
            {pickedImage && (<Image src={pickedImage} alt="the image selected by the user" fill />)}
        </div>
            <input className={classes.input} type="file" id={name} accept='image/png, image/jpeg'
                name={name} ref={imageInput} multiple onChange={handleImageChange} required/>
            
            <button className={classes.button} type='button' onClick={handlePickClick}>Pick on Image</button>

            </div>

            </div>

        </>
    )

}