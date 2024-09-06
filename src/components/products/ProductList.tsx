import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../features/products/productAction";
import { AppDispatch } from "../../store";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import Placeholder from "../common/Placeholder";
import Error from "../common/Error";

const ProductList = () => {
    const { products, loading, error } = useSelector((state: any) => state.products);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])


    if (loading) return <Spinner className="w-10 h-10" />
    if (error) return <Error>{error}</Error>

    return (
        <>
            {products?.products?.length > 0 ?
                <ul className="grid grid-cols-3 gap-3">
                    {
                        products?.products?.map((product: any) => <li className="card" key={product.id}>
                            <Link to={`/products/${product.id}/view`} className="block w-full font-semibold text-xl">
                                {product.title}
                            </Link>
                        </li>
                        )
                    }
                </ul>
                :
                <Placeholder>No Products Found!!</Placeholder>
            }
        </>
    )
}

export default ProductList