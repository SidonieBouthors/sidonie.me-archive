from tkinter import *
from tkinter.scrolledtext import ScrolledText

root= Tk()

class UI:
    def __init__(self, master):

        self.master=master

        self.compilUI= Canvas(root, width= 1400, height=800)
        self.compilUI.pack()

        self.titleLabel = Label(self.compilUI, text='Compiler', font=('Arial', 25))
        self.compilUI.create_window(800, 75, window=self.titleLabel)

        self.recipeArea = Text(self.compilUI, width=75, height=40)
        self.compilUI.create_window(400, 450, window=self.recipeArea)
        self.recipeArea.focus()

        self.compilButton = Button(self.compilUI, text='Compile', command=self.compil)
        self.compilUI.create_window(200, 100, window=self.compilButton)

        self.saveRecipeButton = Button(self.compilUI, text='Save Recipe', command=self.saverecipe)
        self.compilUI.create_window(300, 100, window=self.saveRecipeButton)

        self.saveHtmlButton = Button(self.compilUI, text='Save Html', command=self.savehtml)
        self.compilUI.create_window(400, 100, window=self.saveHtmlButton)
    
    def compil(self):

        self.text = self.recipeArea.get('1.0', 'end-1c')
        self.parsedText=self.text.split('\n')
        self.title=self.parsedText[0]

        html = f"""<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>{title}</title>
            <link href="../css/styles.css" rel="stylesheet" type="text/css">
            <link rel="shortcut icon" href="../img/logo-i-blue.ico">
        </head>   
        <body>  
            <header>
                <img src="../img/logo-p-blue.png" alt="SidoniePyLogo" class="logo">
                <nav>
                    <ul>
                        <li><a href="http://www.sidonie.me">Home</a></li>
                        <li><a href="../recipes">Recipes</a></li>
                        <li><a href="../projects">Projects</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <section class="recipe-page-hero">
                <div class="container">
                    <h1 class="title">{title}</h1>
                </div>
            </section>

            <div class="recipe-container">
            <section class="ingredients">

                <h1>
                    Ingredients
                </h1>    
                <section>
                    <div class="info-box">
                        <section class="info-item">
                            <p><b>Yield:</b> 
                            {yield}
                            <p><b>Prep Time:</b> 
                            {preptime}
                            <p><b>Cooking Time:</b> 
                            {cooktime}
                            <p><b>Wait Time:</b> 
                            {waittime}
                            <p><b>Total Time:</b> 
                            {totaltime}
                            
                        </section>
                    </div>
                </section>

                <ul class="ingredients-list">
                    <li class="ingprop-li">
                        <span class="ingr"></span>
                        <span class="prop"></span>
                    </li>
                    <li class="ingrprop-li">
                        <span class="ingr"></span>
                        <span class="prop"></span>
                    </li>
                    <li class="ingrprop-li">
                        <span class="ingr"></span>
                        <span class="prop"></span>
                    </li>
                    <li class="ingrprop-li">
                        <span class="ingr"></span>
                        <span class="prop"></span>
                    </li>
                    <li class="ingrprop-li">
                        <span class="ingr"></span>
                        <span class="prop"></span>
                    </li>
        
                </ul> 
                
                
                <img src=../img/illus-pita.jpg alt="pita illustration">
                
                
            </section>         

            <section class="directions">
                <h1 class="rec-title">
                    Directions
                </h1>

                <ol>
                    <li>Instructions <b>important</b> instructions</li>
                    <li>Enjoy!</li>
                </ol>

                <section>
                    <div class="info-box">
                        <h1>Tip!</h1>
                        <section class="info-item">
                            tip 1 <b>important</b> <br><br>
                            <br><br>
                        </section>
                    </div>
                </section>
            </section>
            </div>

            <footer>

                <div class="container">

                    <div class="col-3">
                        <p>
                            Hope you like this website and found what you were looking for! 
                        </p>
                        <p>
                            Here are some of my favorite YouTube Channels related to cooking & programming if you'd like to check it out.
                        </p>
                    </div>
                    

                    <div class="col-1">
                        <ul class="unstyled-list">
                            <li><strong>Cooking Channels</strong></li>
                            <li><a href="https://www.youtube.com/user/FrenchGuyCooking">Alex</a></li>
                            <li><a href="https://www.youtube.com/channel/UChBEbMKI1eCcejTtmI32UEw">Joshua Weissman</a></li>
                            <li><a href="https://www.youtube.com/user/BrothersGreenEats">Pro Home Cooks</a></li>
                        </ul>
                    </div>

                    <div class="col-1">
                        <ul class="unstyled-list">
                            <li><strong>Science Channels</strong></li>
                            <li><a href="https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw">3Blue1Brown</a></li>
                            <li><a href="https://www.youtube.com/channel/UC4JX40jDee_tINbkjycV4Sg">Tech with Tim</a></li>
                            <li><a href="https://www.youtube.com/user/keeroyz">Two Minute Papers</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </body>   
    </html>"""


    def saverecipe(self):

        self.text = self.recipeArea.get('1.0', 'end-1c')
        self.parsedText=self.text.split('\n')
        self.title=self.parsedText[0]

        file = open(self.title + '.txt', 'w')
        file.write(self.text)
        file.close()

    def savehtml(self):
        file = open('compiled.html', 'w')
        file.write('hello')
        file.close()

App=UI(root)
root.mainloop()

