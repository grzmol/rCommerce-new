import React from 'react';
import axios from "axios";

import {withTranslation} from "react-i18next";
import {Container, Divider, TextField} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

import "./productDetails.css";
import AwesomeSlider from "react-awesome-slider";
import 'react-awesome-slider/dist/styles.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import BreadcrumbComponent from "../Breadcrumb/breadcrumb";
import MuiAlert from "@material-ui/lab/Alert";
import LastViewedProductsComponent from "../LastViewedProducts/lastViewedProducts";
import LoaderComponent from "../Loader/loader";
import {addToCart} from "../../actions/cartActions";
import {connect} from "react-redux";

class ProductDetailsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataReady: false,
            product: {},
            images: [],
            productQuantity: 1,
            showAddToMessage: false,
            showBackdrop: false
        }
        this.validateAndSaveQty = this.validateAndSaveQty.bind(this);
        this.showAddToMessage = this.showAddToMessage.bind(this);
        this.hideAddToMessage = this.hideAddToMessage.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        let productCode = this.props.match.params.productCode || '';
        axios.get('/api/product/' + productCode).then(resp => {
            if(resp.status === 200 && resp.data){
                let product = resp.data.product;
                if(product){
                    this.setState({
                        product: product,
                        images: [product.image]
                    });

                    let lastViewedProductsJSON = sessionStorage.getItem('lastViewed') || '[]';
                    let lastViewedArray = JSON.parse(lastViewedProductsJSON);
                    if(!_.includes(lastViewedArray, product._id)){
                        lastViewedArray.push(product._id);
                        sessionStorage.setItem('lastViewed',JSON.stringify(lastViewedArray));
                    }
                }
            }
            this.setState({dataReady: true});

        }).catch(err => {
            console.error(err)
        });

    }

    validateAndSaveQty(event) {
        let currValue = event.target.value;

        if(_.isNumber(Number(currValue)) && currValue > 0){
            this.setState({productQuantity: currValue})
        }else{
            event.target.value = this.state.productQuantity;
        }

    }

    addToCart(event) {
        let currentUser = this.props.user;
        let product = this.state.product;
        if(currentUser.username){
            let productToAdd = {
                user: currentUser.username,
                product: product._id,
                quantity: this.state.productQuantity
            };
            this.props.addToCart(productToAdd);
        }
    }

    showAddToMessage(){
        this.setState({showAddToMessage: true});
        setTimeout(this.hideAddToMessage, 2000);

    }

    hideAddToMessage(){
        this.setState({showAddToMessage: false});
    }

    render() {
        const {t} = this.props;
        let product = this.state.product;
        const addToCartMessageStyle = {
            position: 'fixed',
            top: '85px',
            right: this.state.showAddToMessage ? '20px' : '-500px',
            transition: 'right 1s'
        }
        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} style={addToCartMessageStyle}/>;
        }

        return (
            <div className={'product-details-wrapper'}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <BreadcrumbComponent product={ product } category={ product.category }/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <AwesomeSlider className="awesome-slider-cust">
                                {this.state.images.map(item => <div className="carousel-image-wrapper" key={item} ><img className="carousel-image" src={item} /></div>)}
                            </AwesomeSlider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h1>{product.name}</h1>
                                    <p>{t('ProductDetail_Code')}:&nbsp;{product.productCode}&nbsp;PLN</p>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="product-details-desc">
                                        <p className="section-label">{t('ProductDetail_ShortDescription')}</p>
                                        {product.desc}
                                    </div>
                                    <p></p>
                                    <Divider/>
                                </Grid>
                                <Grid item xs={12}>
                                    <h2>{t('ProductDetail_Price')}:&nbsp;{product.price}&nbsp;PLN</h2>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        id="standard-number"
                                        label={t('ProductDetail_Quantity')}
                                        type="number"
                                        value={this.state.productQuantity}
                                        onInput={this.validateAndSaveQty}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={9} style={{display: "flex", alignItems: "flex-end"}}>
                                    <Button variant="contained" color="primary" onClick={this.addToCart} fullWidth>
                                        {t('Button_AddToCart')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} style={{marginTop: "40px"}}>
                            <Grid item xs={12} md={12} lg={12}>
                                <div className="product-details-desc">
                                    <p className="section-label">{t('ProductDetail_Description')}</p>
                                    {product.desc}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Alert severity="success">{t('AddToCart_Success')}</Alert>
                <LastViewedProductsComponent />
                <LoaderComponent style={{display: !this.state.dataReady ? 'inline-block' : 'none'}} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (itemToAdd)=> dispatch(addToCart(itemToAdd))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ProductDetailsComponent)));