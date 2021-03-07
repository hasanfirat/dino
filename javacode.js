            var cimen_sayaci = 0;
            var kaktus_sayaci = 0;
            var dino_animasyon_sayaci = 1;
            var dino_geberirse = 1;
            var yesil_dino = document.getElementById("yesil_dino");
            var dead = false;
            var dino_konumu_left = 100;
            var ziplamaya_karar_verici_bug = true;
            var yukselme_durumu = true;
            var aaa = false;
            var dino_konumu_top = 70;
            var jump = false;
            var gebermis_dinonun_yere_dusmesi = false;
            var score = 0;
            var renk_karar_yapisi = false;
            var dongu1 = setInterval(cimen_uretme, 50);
            var dongu0 = setInterval(cimen_hareketke, 30);
            var dongu2 = setInterval(kaktus_uretme, 5000);
            var dongu3 = setInterval(kaktus_hareket_ettirme, 30);
            var dongu4 = setInterval(dino_hareketke, 70);
            var dongu5 = setInterval(durum_yapisi, 30);
            var dongu6 = setInterval(ziplama_fonksiyonu, 30);
            var dongu6 = setInterval(point_y, 100);

            function point_y()
            {
                score++;
                document.getElementById("point").innerHTML = "score " + score;
            }

            function cimen_uretme()
            {
                var cimen_konum_top = Math.floor(Math.random() * 97);
                cimen_sayaci++;
                document.getElementById("zemin").innerHTML += "<div class='alanda_cimen' style='top:"+ cimen_konum_top + "px;left:996px;'></div>";
            }

            function cimen_hareketke()
            {
                var z = document.querySelectorAll(".alanda_cimen");
                var i = 0;
                while (i < z.length)
                {
                    var yeni_konum = z[i].style.left.slice(0 , (z[i].style.left.length-2)) - ( 7 + (z[i].style.top.slice(0 , (z[i].style.top.length-2)) /25) ) ;
                    z[i].style.left = yeni_konum + "px";
                    if(yeni_konum < 0){z[i].remove();}                    
                    i++;
                }
            }

            function kaktus_uretme()
            {
                var kaktus_resmi = Math.floor(Math.random() * 14);
                document.getElementById("arazi").innerHTML += "<img src='kaktus_png/kaktus_k_"+ kaktus_resmi +".png' id='kaktus_"+ kaktus_sayaci + "' style='top:70px;left:996px; position: absolute;' width='30' height='30' class='kaktus'>";
                kaktus_sayaci++;                
            }
            function kaktus_hareket_ettirme()
            {
                var k = document.querySelectorAll(".kaktus");
                var l = 0;

                while (l < k.length)
                {
                    var yeni_konumccc = k[l].style.left.slice(0,(k[l].style.left.length-2)) - 5 ;
                    if(yeni_konumccc < -50){k[l].remove();}
                    k[l].style.left = yeni_konumccc + "px";
                    l++;
                }
            }

            function dino_hareketke()
            {
                if(dead == false && jump == false)
                {
                    if(dino_animasyon_sayaci >=9 ){dino_animasyon_sayaci = 1;}
                    yesil_dino.src = "dino_png/run/run" + dino_animasyon_sayaci + ".png";
                    dino_animasyon_sayaci++;
                }
                else if(dead == false && jump == true)
                {
                    if(dino_animasyon_sayaci >=12 ){dino_animasyon_sayaci = 1;}
                    yesil_dino.src = "dino_png/jump/jump" + dino_animasyon_sayaci + ".png";
                    dino_animasyon_sayaci++;
                }
                else if(dead == true)
                {                    
                    if(dino_animasyon_sayaci >=18 ){dino_animasyon_sayaci = 1;}
                    yesil_dino.src = "dino_png/dead/dead" + dino_geberirse + ".png";
                    dino_geberirse++;
                    if(dino_geberirse >= 9 )
                    {
                        
                        clearInterval(dongu4);                        
                        clearInterval(dongu5);
                        clearInterval(dongu6);
                        var geberince_dusme = setInterval( 
                        function aaaaa()
                        {                      
                        dino_konumu_top += 2;
                        yesil_dino.style.top = dino_konumu_top+"px";
                        if(dino_konumu_top >= 70)
                        {
                            clearInterval(dongu1);
                            clearInterval(dongu0);
                            clearInterval(dongu2);
                            clearInterval(dongu3);
                            clearInterval(geberince_dusme);
                            var resim = document.createElement("img");
                            resim.src = "game_over.png";
                            resim.style = "position:absolute;top:0px;left:0px;margin:0px;0px;";
                            resim.width = "1000";
                            resim.height = "200";
                            document.getElementById("alan").appendChild(resim);
                            }
                        },30);
                    }
                }                
            }

            function durum_yapisi()
            {
                var k = document.querySelectorAll(".kaktus");
                var l = 0;

                while (l < k.length)
                {
                    var anlik_kaktus_konumu_left = k[l].style.left.slice(0,(k[l].style.left.length-2));
                    if((dino_konumu_left+30 >= anlik_kaktus_konumu_left) && (dino_konumu_left <= anlik_kaktus_konumu_left+20 )) 
                    {
                        if(dino_konumu_top < 50){}
                        else{dead = true;}                      
                    }
                    l++;
                }
            }            
            
            document.onkeyup = move;
            function move(e)
            {
                if((e.keyCode == 32 && ziplamaya_karar_verici_bug == true) && dead == false)
                {
                    ziplamaya_karar_verici_bug = false;
                    aaa = true;
                    jump = true;
                }
            }

            function ziplama_fonksiyonu()
            {                
                if(yukselme_durumu == true && aaa == true)
                {
                    dino_konumu_top -= 2;
                    yesil_dino.style.top = dino_konumu_top;
                    if(dino_konumu_top <= 10)
                    {
                        yukselme_durumu = false;
                    }
                }
                else if(yukselme_durumu == false && aaa == true)
                {
                    dino_konumu_top += 2;
                    yesil_dino.style.top = dino_konumu_top+"px";
                    if(dino_konumu_top >= 70)
                    {
                        yukselme_durumu = true;
                        ziplamaya_karar_verici_bug = true;
                        aaa = false;
                        jump=false;
                    }
                }                
            }