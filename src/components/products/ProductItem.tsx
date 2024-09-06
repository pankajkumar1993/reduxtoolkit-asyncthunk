import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { fetchProductById } from "../../features/products/productAction";
import Placeholder from "../common/Placeholder";
import Spinner from "../common/Spinner";
import Error from "../common/Error";

const ProductItem = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedProduct, loading, error } = useSelector((state: any) => state.products);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    if (loading) return <Spinner className="w-10 h-100" />;
    if (error) return <Error>Error: {error}</Error>;

    return (
        <div className="card">
            {selectedProduct ? (
                <>
                    <Link to="/products" className="text-green-500 underline capitalize text-lg">back</Link>
                    <h2 className="text-2xl font-bold mb-1">{selectedProduct.title}</h2>
                    <p>{selectedProduct.description}</p>
                    <p>Price: ${selectedProduct.price}</p>
                </>
            ) : (
                <Placeholder>Product not found.</Placeholder>
            )}
        </div>
    );
};

export default ProductItem;
