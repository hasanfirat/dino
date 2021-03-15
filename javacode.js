            var cimen_sayaci = 0;
            var yildiz_sayaci = 0;
            var kaktus_sayaci = 0;
            var bulut_sayaci = 0;
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
            var sun = true;
            var renk_karar_yapisi = false;
            var moon_konum = 150;
            var sun_konum = 0;
            var sun_have = true;
            var sayac = 0;
            var arazi_renk_rgb = 200;
            var dongu1 = setInterval(gunes_ay_dongu, 1000);
            var dongu2 = setInterval(kaktus_uretme, 3500);
            var dongu3 = setInterval(kaktus_hareket_ettirme, 20);
            var dongu4 = setInterval(dino_hareketke, 70);
            var dongu5 = setInterval(durum_yapisi, 30);
            var dongu6 = setInterval(ziplama_fonksiyonu, 30);
            var dongu7 = setInterval(point_y, 100);
            var dongu9 = setInterval(bulut_uretme, 2000);
            var dongu10 = setInterval(bulut_hareket_ettirme, 25);

            function point_y()
            {
                score++;
                document.getElementById("point").innerHTML = "score " + score;
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
                        clearInterval(dongu7);
                        var geberince_dusme = setInterval( 
                        function aaaaa()
                        {                      
                        dino_konumu_top += 2;
                        yesil_dino.style.top = dino_konumu_top+"px";
                        if(dino_konumu_top >= 70)
                        {
                            clearInterval(dongu2);
                            clearInterval(dongu3);
                            clearInterval(dongu9);
                            clearInterval(dongu10);
                            clearInterval(dongu1);
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

            function bulut_uretme()
            {
                var bulut_resmi = Math.floor(Math.random() * 12);
                document.getElementById("arazi").innerHTML += "<img src='sky/cloud/cloud"+ bulut_resmi +".png' id='bulut_"+ bulut_sayaci + "' style='top:20px;left:996px; position: absolute;' width='20' height='20' class='bulut'>";
                bulut_sayaci++;                
            }
            function bulut_hareket_ettirme()
            {
                var k_y = document.querySelectorAll(".bulut");
                var l_y = 0;

                while (l_y < k_y.length)
                {
                    var yeni_konumccc_y = k_y[l_y].style.left.slice(0,(k_y[l_y].style.left.length-2)) - 5 ;
                    if(yeni_konumccc_y < -50){k_y[l_y].remove();}
                    k_y[l_y].style.left = yeni_konumccc_y + "px";
                    l_y++;
                }
            }
            
            function gunes_ay_dongu()
            {
                sayac = sayac + 10;
                if(sun_have == false && (sayac % 200) == 0)
                {
                    sun_have = true;
                    gunes_yukselir_adim1();
                }
                else if(sun_have == true && (sayac % 200) == 0)
                {
                    sun_have = false;
                    ay_yukselir_adim1();
                }
            }

            function gunes_yukselir_adim1()
            {
                var dongu_gunes_1 = setInterval(function gunes_yukselir_ay_duser_1()
                {                
                    moon_konum = moon_konum + 5;
                    document.getElementById("moon").style.top = moon_konum + "px";                
                if(moon_konum >= 150)
                {
                    clearInterval(dongu_gunes_1);
                    gunduze_gecis();
                    gunes_yukselir_adim2();
                }                
                }, 50);
            }

            function gunes_yukselir_adim2()
            {
                var dongu_gunes_2 = setInterval(function gunes_yukselir_ay_duser_2()
                {
                    sun_konum = sun_konum - 5;
                    document.getElementById("sun").style.top = sun_konum + "px";
                    if(sun_konum <= 0 && moon_konum >= 150)
                {
                    clearInterval(dongu_gunes_2);
                }                
                }, 50);
            }
            
            function ay_yukselir_adim1()
            {
                var dongu_ay_1 = setInterval(function gunes_duser_ay_yukselir_1()
                {
                sun_konum = sun_konum + 5;
                document.getElementById("sun").style.top = sun_konum + "px";
                if(sun_konum >= 150)
                {
                    clearInterval(dongu_ay_1);
                    geceye_gecis();
                    ay_yukselir_adim2();
                }
                }, 50);
            }

            function ay_yukselir_adim2()
            {
                var dongu_ay_2 = setInterval(function gunes_duser_ay_yukselir_2()
                {
                moon_konum = moon_konum - 5;
                document.getElementById("moon").style.top = moon_konum + "px";
                if(moon_konum <= 0 && sun_konum >= 150)
                {
                    clearInterval(dongu_ay_2);
                }
                }, 50);
            }

            function gunduze_gecis()
            {
                var gunduze_geciyoruz = setInterval(function gunduze_gecme_fonk()
                {
                    arazi_renk_rgb = arazi_renk_rgb + 5;
                    document.getElementById("arazi").style.backgroundColor = "rgb(" + arazi_renk_rgb + ", " + arazi_renk_rgb + ", " + arazi_renk_rgb + ")";
                    if(arazi_renk_rgb == 200)
                    {
                        clearInterval(gunduze_geciyoruz);
                    }          
                }, 50); 
                
            }

            function geceye_gecis()
            {
                var geceye_geciyoruz = setInterval(function geceye_gecme_fonk()
                {
                    arazi_renk_rgb = arazi_renk_rgb - 5;
                    document.getElementById("arazi").style.backgroundColor = "rgb(" + arazi_renk_rgb + ", " + arazi_renk_rgb + ", " + arazi_renk_rgb + ")";
                    if(arazi_renk_rgb == 100)
                    {
                        clearInterval(geceye_geciyoruz);
                    }          
                }, 50); 
            }