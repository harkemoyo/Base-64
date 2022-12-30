let out = document.getElementById("out");

let num = 17;
out.innerHTML += "17 in hexadecimal is " + num.toString(16) + "<br/>";
out.innerHTML += "17 in base-36 is " + num.toString(36) + "<br/>";


  // window.btoa(unescape(encodeURIComponent(str)));
        //to base-64
        // decodeURIComponent(escape(window.atob(encoded value)));
        //from base-64
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa#Unicode_Strings
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_.232_.E2.80.93_rewriting_atob()_and_btoa()_using_TypedArrays_and_UTF-8
        
        try{
            let str = btoa('abc🤔');
            out.innerHTML += str + ' is abc🤔 in base-64.</br>';
        }
        catch(err){
            out.innerHTML += 'ERROR. ' + err.message + '<br/>';
            let str2 = btoa( unescape( encodeURIComponent('abc🤔')));
            out.innerHTML += str2 + ' is abc🤔 in base-64.</br>';
        }


           // input type="file" + 
        // files[0].name +
        // URL.createObjectURL() 
        // fileReader.readAsDataURL( )
        // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
        // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
        let imgTemp = document.createElement('img');
        imgTemp.src = '';
            
        
        let input = document.getElementById('imgInput');
        input.addEventListener('change', (ev)=>{
            let file = ev.target.files[0];
        
       

        // version 1

            if (file){
                let nm = window.URL.createObjectURL(file);
                out.innerHTML += 'BLOB URL:<br/>' + nm + '<br/>';
                let img = document.createElement('img');
                img.addEventListener('load',(ev)=>{
                    //then clear up the memory
                    URL.revokeObjectURL(nm);
                })
                    img.src = nm;
                    img.classList.add('createObjectURL');
                    document.querySelector('main').appendChild(img);
            }
            let reader = new FileReader();
            reader.addEventListener('load', (ev)=>{
                let img1 = document.createElement('img');
                img1.src = ev.currentTarget.result;
                img1.classList.add('FileReader');
                
                out.innerHTML += 'Base64 String from FileReader<br/>' + ev.currentTarget.result + '<br/>';
                document.querySelector('main').appendChild(img1);
            })
            reader.readAsDataURL(file);




        
            // HTML5 Canvas for images
            // canvas.toDataURL(type, encoderOptions);
            //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
            let canvas = document.getElementById('canvas');
            canvas.id = 'canvas';
            const context = canvas.getContext('2d');
            
            context.drawImage(imgTemp, 0, 0, 128, 128);
            //get the image from the canvas as a base64 string
            let canvas64 = canvas.toDataURL();
            out.innerHTML += 'Base64 String from Canvas<br/>' + canvas64 + '<br/>';
            let img2 = document.createElement('img');
            img2.classList.add('canvas');
            img2.src = canvas64;
            document.querySelector('main').appendChild(img2);
            
            //get the image from the canvas as a blob
            let canvasblob = canvas.toBlob((theblob)=>{
                
                let blobURL = URL.createObjectURL(theblob);
                out.innerHTML += 'Blob from Canvas<br/>' + blobURL + '<br/>';
                img2.onload = function() {
                    // no longer need to read the blob so it's revoked
                    URL.revokeObjectURL(blobURL);
                };
            }, 'image/jpeg', 0.8);
               
        })