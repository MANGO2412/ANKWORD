export default function  Spinner({show,hiddenText}){
    if(show){
        return(
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }

    return(
        <>{hiddenText}</>
    )   
}