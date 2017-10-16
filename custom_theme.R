# ggplot theme
library(ggplot)
library(showtext)
font_add("Nexa Light", "Nexa Light.otf")
font_add("Nexa Bold", "Nexa Bold.otf")

###################
## theme

pallete<- c("#484EF4", "#1922FF",  "#0009FF",	"#B29000", 	"#FFCD00")
pallete2 <- c("#4870F4", "#3D5399",  "#00C2FF",	"#FF8440", 	"#CC3912")
scale_fill_mark <- function(){
  structure(list(
    scale_fill_manual(values=pallete)
  ))
}

scale_color_discrete_mark <- function(){
  structure(list(
    scale_color_manual(values=pallete)
  ))
}

scale_color_continuous_mark <- function(){
  structure(list(
    scale_color_gradientn(colours = pallete)
  ))
}
##################################

theme_mark <- function(base_size=12, font=NA){
  
  txt <- element_text(size = base_size, colour = "black", family="Nexa Light")
  bold_txt <- element_text(size = base_size+2, colour = "black", family="Nexa Bold")
  
  theme_minimal(base_size = base_size, base_family = font) +
    theme(
      ###### clean up!
      legend.key = element_blank(), 
      strip.background = element_blank(), 
      ########### text basics
      text = txt, 
      plot.title = bold_txt, 
      axis.title = txt, 
      axis.text = txt, 
      legend.text = txt ) +
    
    ############## axis lines
    theme(
      axis.line.y = element_line(colour = "#333333", size = 0.8, linetype = "solid"),
      axis.line.x = element_line(colour = "#333333", size = 0.8, linetype = "solid"),
      
      ### legend  top and no title!
      legend.position = "top", 
      legend.title = element_blank(),
      legend.key = element_rect(fill = "#f8f8f8", color = "#f8f8f8"),
      legend.background = element_rect( fill = "#f8f8f8",color = "#f8f8f8", size = 0.5, linetype = "solid"),
      
      ## background
      plot.background = element_rect(fill = "#f0f0f0",colour = "#f0f0f0",size = 0.5)
    )
}

####################

theme_set(theme_mark()) 