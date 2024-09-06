import SectionHeading from "../../components/common/SectionHeading"
import ProductList from "../../components/products/ProductList"

const Products = () => {
    return (
        <>
            <SectionHeading title="Products" marginb centered={false} />
            <ProductList />
        </>
    )
}

export default Products