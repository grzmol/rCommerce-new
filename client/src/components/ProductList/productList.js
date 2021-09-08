import React, {useEffect, useState} from 'react';
import axios from "axios";

import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";

import "./productList.css";
import {Container, FormControl, InputLabel, Select} from "@material-ui/core";
import ProductGridItem from "../ProductGridItem/productGridItem";
import AuthService from "../../services/authService";
import _ from "lodash";

const auth = new AuthService();
const currentUser = auth.getProfile();

const ProductListComponent = (props) => {
    const {t} = props;
    const [products, setProducts] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [sortingOption, setSortingOption] = useState();
    const query = new URLSearchParams(props.location.search);
    const category = query.get('category');

    useEffect(() => {
        if (!fetching) {
            setFetching(true);
            axios.get(category ? '/api/product/getByCategory/' + category : '/api/product').then(resp => {
                if (resp.status === 200) {
                    setProducts(resp.data);
                }
            });
        }
    });

    const sortBy = (event) => {
        let val = event.target.value;
        setSortingOption(val);

        switch (val) {
            case 'name-asc':
                setProducts(_.sortBy(products, 'name'))
                break;
            case 'name-desc':
                setProducts(_.sortBy(products, 'name').reverse())
                break;
            case 'price-asc':
                setProducts(_.sortBy(products, 'price'))
                break;
            case 'price-desc':
                setProducts(_.sortBy(products, 'price').reverse())
                break;
            default:
                setFetching(false);
                break;
        }
    }

    return (
        <div className="product-list-container">
            <Container>
                <h1>{t('ProductList_Title')}</h1>
                <div className="product-list-filter-section">
                    <FormControl style={{float: 'right'}}>
                        <InputLabel htmlFor="sort-option-input">{t('Sort_Action')}</InputLabel>
                        <Select
                            native
                            value={sortingOption}
                            onChange={sortBy}
                            inputProps={{
                                name: 'sort',
                                id: 'sort-option-input',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value="name-asc">{t('Sort_NameAsc')}</option>
                            <option value="name-desc">{t('Sort_NameDesc')}</option>
                            <option value="price-asc">{t('Sort_PriceAsc')}</option>
                            <option value="price-desc">{t('Sort_PriceDesc')}</option>
                        </Select>
                    </FormControl>
                </div>
                <div className="product-list-content">
                    {products.map(item => <ProductGridItem key={item.productCode} currentUser={currentUser}
                                                           product={item}/>)}
                </div>

            </Container>

        </div>
    )
};
export default withTranslation()(withRouter(ProductListComponent));