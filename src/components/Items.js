export default function Items(props){
    let productObj=props.productObj;
    return(
        <div class="card shadow h-100">
            <div class="card-body text-start">
                <img src={productObj.productImage} class="w-100"  />
                <h5>Name : {productObj.productname}</h5>
                <h5>Price : {productObj.price}</h5>
                <h5>Brand :{productObj.brand}</h5>
                <div class="d-flex float-end">
                    <button type="button" class="btn btn-sm btn-info">Buy</button>
                </div>
            </div>

        </div>
    )
}