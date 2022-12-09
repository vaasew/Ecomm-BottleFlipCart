import React from 'react'
import  AppBar  from '@mui/material/AppBar'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { IconButton } from '@mui/material'
import { Badge } from '@mui/material'
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp"
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import {useSelector,useDispatch} from "react-redux"
import { getItemCount } from '../utils'
import { styled } from '@mui/material'
import { alpha } from '@mui/material'
import { Autocomplete } from '@mui/material'
import { TextField } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { fetchAllCategories } from '../feature/categories-slice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSearchParams,Link } from 'react-router-dom'
import { NoEncryption } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import SearchIcon from "@mui/icons-material/Search"

const  Search=styled("section")(({theme})=>({
  position:"relative",
  borderRadius:theme.shape.borderRadius,
  display:"flex",
  width:"100%",
  backgroundColor:alpha(theme.palette.common.white,0.15),
  "&:hover":{
  backgroundColor:alpha(theme.palette.common.white,0.25),
  // marginRight:theme.spacing(2),
  // marginLeft:0,

  }
}))

const StyleAutocomplete=styled(Autocomplete)(({theme})=>(
  {
    color:"inherit",
    width:"100%",
    "& .MuiTextField-root":{
      paddingRight:`calc(1em+${theme.spacing(4)})`
    },
    "& .MuiInputBase-input":{
      color:theme.palette.common.white

    },
    "& .MuiOutlinedInput-notchedOutline":{
      border:"none",
    },
    "& .MuiSvgIcon-root":{
      fill:theme.palette.common.white,
    }
  }
))

const SearchIconWrapper=styled("section")(({theme})=>({
  padding:theme.spacing(0,2),
  height:"100%",
  position:"absolute",
  right:0,
  pointerEvents:"none",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
}))

const StyledLink=styled(Link)(({theme})=>({
  color:theme.palette.common.white,
  textDecoration:"none",
 
}))

function SearchBar(){
  const theme=useTheme()
  const categories=useSelector(state=>state.categories.value);
  const products=useSelector(state=>state.products?.value);
  const [selectedCategory, setselectedCategory] = useState("All")
  const [searchParams]=useSearchParams();
  const category=searchParams.get("category");
  const searchTerm =searchParams.get("searchTerm")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const dispatch=useDispatch();
  const navigate=useNavigate();

useEffect(()=>{
  setselectedCategory(category?category:"all");
},[category])

  if(!categories.length){
    dispatch(fetchAllCategories())
  }

  function handleCategoryChange(event){

    const {value}=event.target;
    navigate(value==="all"? "/":`/?category=${value}${searchTerm?"&searchterm="+searchTerm:""}`)
  }

  function handleSearchChange(searchText){
    if(searchText){
      navigate(selectedCategory==="all"?`?searchterm=${searchText}`:`/?category=${selectedCategory}&searchterm=${searchText}`)
    }
    else{
      navigate(selectedCategory==="all"?`/`:`/?category'${selectedCategory}`)

    }
  }

  return(
    <>
    <Search>
      <Select size="small" 
      value={selectedCategory}
      sx={{
        m:2,
        "&":{
          "::before":{
            ":hover":{
              border:"none",
            },
          },
          "::before, & ::after":{
            border:"none",
          },
          ".MuiSelect-standard":{
            color:"common.white"
          },
          ".MuiSelect-icon":{
            fill:theme.palette.common.white,
          }
        },
        textTransform:"capitalize",
      }}
      variant="standard"
      labelId="selected-category"
      id="selected-category-id"
      onChange={handleCategoryChange}
      >
        <MenuItem sx={{
          textTransform:"capitalize"

        }} value="all">all</MenuItem>
        {categories?.map(category=>
        <MenuItem key={category} 
        sx={{ textTransform:"capitalize",
      }}
        value={category}>
          {category}
        </MenuItem>)}
      </Select>
    <StyleAutocomplete
    freeSolo
    id="selected-product"
    value={selectedProduct}
    onChange={(e,value)=>{
      handleSearchChange(value?.label);
    }}
  disablePortal
  options={Array.from(selectedCategory==="all"?products:products.filter((prod)=>prod.category===selectedCategory),
  (prod)=>({id:prod.id,label:prod.title})
  )}
  renderInput={(params) => <TextField {...params}  />}
/>
<SearchIconWrapper><SearchIcon/></SearchIconWrapper>
    </Search>
    </>
  )
}



function Header() {

  const cartItems=useSelector(state=>state.cart?.value);
  const count=getItemCount(cartItems)
  const navigate=useNavigate();

  function navigateToCart(){
    navigate("/cart")
  }

  return( <AppBar position="sticky" sx={{
    py:1,

  }}>
    <Toolbar sx={{
      display:"flex",gap:2
    }}>
        <Typography variant="h6" color="inherit" sx={{
            flexGrow:1,

        }}>
          <StyledLink to="/">
            BottleFlipKart
          </StyledLink>
        </Typography>
        <SearchBar/>

        <Box sx={{
            display:{xs:"none",md:"flex"}
        }}>

        <IconButton onClick={navigateToCart} size="large" aria-label="cart items count" color="inherit">
        
             <Badge badgeContent={count} color="error">
                <ShoppingCartSharpIcon/>
             </Badge>
        </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
  )
}

export default Header