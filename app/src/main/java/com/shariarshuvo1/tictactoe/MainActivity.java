package com.shariarshuvo1.tictactoe;

import androidx.appcompat.app.AppCompatActivity;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

        //----------------Global Items-----------------//
        String[] game={"A","A","A","A","A","A","A","A","A","A"};
        boolean[] winner={false,false};
        Integer[] player={0};
        //----------------End of Global Items---------//

        //----------------Valid Player----------------//
        public void button_selector(String [] game,int player,MediaPlayer x_play,MediaPlayer o_play,ImageButton box,ImageView player_display,int button_num){
                if (player==0){
                        o_play.start();
                        box.setImageDrawable(getResources().getDrawable(R.drawable.circle_100x100));
                        game[button_num]="O";
                        player_display.setImageDrawable(getResources().getDrawable(R.drawable.xplayer_120x180));
                }
                else{
                        x_play.start();
                        box.setImageDrawable(getResources().getDrawable(R.drawable.cross_100x100));
                        game[button_num]="X";
                        player_display.setImageDrawable(getResources().getDrawable(R.drawable.oplayer_120x180));
                }

        }
        //----------------End of Valid Player----------//
        //----------------Winner Checker---------------//
        public void winner_checker(String[] game,int player,boolean[] winner,ImageView hr_top,ImageView hr_mid,ImageView hr_down,ImageView vr_left,ImageView vr_mid,ImageView vr_right,ImageView l_to_d,ImageView l_to_up,MediaPlayer win_sound){
                boolean win=false;
                if (player==0){
                        win=true;
                }
                else{
                        win=false;
                }
                if((game[1]==game[2]) && (game[2]==game[3]) && (game[1]!="A")){
                        winner[0]=true;
                        winner[1]=win;
                        hr_top.setImageDrawable(getResources().getDrawable(R.drawable.line_hoizontal_73x340));
                }
                else if((game[4]==game[5]) && (game[5]==game[6]) && (game[4]!="A")){
                        winner[0]=true;
                        winner[1]=win;
                        hr_mid.setImageDrawable(getResources().getDrawable(R.drawable.line_hoizontal_73x340));
                }
                else if((game[7]==game[8]) && (game[8]==game[9]) && (game[7]!="A")){
                        winner[0]=true;
                        winner[1]=win;
                        hr_down.setImageDrawable(getResources().getDrawable(R.drawable.line_hoizontal_73x340));
                }
                else if((game[1]==game[4]) && (game[4]==game[7]) && (game[1]!="A")){
                        winner[0]=true;
                        winner[1]=win;
                        vr_left.setImageDrawable(getResources().getDrawable(R.drawable.line_veticle_340x73));
                }
                else if((game[2]==game[5]) && (game[5]==game[8]) && (game[2]!="A")){
                        winner[0]=true;
                        winner[1]=win;
                        vr_mid.setImageDrawable(getResources().getDrawable(R.drawable.line_veticle_340x73));
                }
                else if((game[3]==game[6]) && (game[6]==game[9]) && (game[3]!="A")){
                        winner[0]=true;
                        winner[1]=win;
                        vr_right.setImageDrawable(getResources().getDrawable(R.drawable.line_veticle_340x73));
                }
                else if((game[1]==game[5]) && (game[5]==game[9]) && (game[1]!="A")){
                        winner[0]=true;
                        winner[1]=win;
                        l_to_d.setImageDrawable(getResources().getDrawable(R.drawable.line_left_to_up));
                }
                else if((game[3]==game[5]) && (game[5]==game[7]) && (game[3]!="A")){
                        winner[0]=true;
                        winner[1]=win;
                        l_to_up.setImageDrawable(getResources().getDrawable(R.drawable.line_left_to_up));
                }
                else{
                        winner[0]=false;
                }

        }
        //---------------------End of Winner Checker--------------------//
        //---------------------Tie Checker------------------------------//
        public void tie_checker(ImageButton restart,ImageView player_display,boolean[] winner,Integer[] pl_arr,int player,ImageView win_page,ImageView win_sign,ImageView tie_sign,MediaPlayer win_play,MediaPlayer Tie_play,ImageButton box1,ImageButton box2,ImageButton box3,ImageButton box4,ImageButton box5,ImageButton box6,ImageButton box7,ImageButton box8,ImageButton box9){
                if (winner[0]==true){
                        player_display.setVisibility(View.INVISIBLE);
                        win_play.start();
                        win_page.setImageDrawable((getResources().getDrawable(R.drawable.win_page)));

                        if (winner[1]==true){
                                win_sign.setImageDrawable((getResources().getDrawable(R.drawable.circle_100x100)));
                        }
                        else{
                                win_sign.setImageDrawable((getResources().getDrawable(R.drawable.cross_100x100)));
                        }
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                        restart.setImageDrawable((getResources().getDrawable(R.drawable.playagain_360x128)));

                }
                if (player==8 && winner[0]==false){
                        player_display.setVisibility(View.INVISIBLE);
                        Tie_play.start();
                        tie_sign.setImageDrawable((getResources().getDrawable(R.drawable.tie)));
                        box1.setClickable(false);
                        box2.setClickable(false);
                        box3.setClickable(false);
                        box4.setClickable(false);
                        box5.setClickable(false);
                        box6.setClickable(false);
                        box7.setClickable(false);
                        box8.setClickable(false);
                        box9.setClickable(false);
                        restart.setImageDrawable((getResources().getDrawable(R.drawable.playagain_360x128)));
                }
        }
        //---------------------End of Tie Checker-----------------------//
        @Override
        protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
                //----------------Decleareing------------//
                ImageButton box1=findViewById(R.id.box1);
                ImageButton box2=findViewById(R.id.box2);
                ImageButton box3=findViewById(R.id.box3);
                ImageButton box4=findViewById(R.id.box4);
                ImageButton box5=findViewById(R.id.box5);
                ImageButton box6=findViewById(R.id.box6);
                ImageButton box7=findViewById(R.id.box7);
                ImageButton box8=findViewById(R.id.box8);
                ImageButton box9=findViewById(R.id.box9);
                ImageButton restart_button=findViewById(R.id.restart_display);
                ImageView player_display=findViewById(R.id.player_display);
                ImageView hr_top=findViewById(R.id.line_hr_up);
                ImageView hr_mid=findViewById(R.id.line_hr_mid);
                ImageView hr_down=findViewById(R.id.line_hr_down);
                ImageView vr_left=findViewById(R.id.line_vr_left);
                ImageView vr_mid=findViewById(R.id.line_vr_mid);
                ImageView vr_right=findViewById(R.id.line_vr_right);
                ImageView left_to_down=findViewById(R.id.line_corner_left_to_right_down);
                ImageView left_to_up=findViewById(R.id.line_corner_left_to_right_up);
                ImageView win_page=findViewById(R.id.win_page);
                ImageView win_sign=findViewById(R.id.winner_sign);
                ImageView tie_sign=findViewById(R.id.tie);
                final MediaPlayer x_play=MediaPlayer.create(this,R.raw.x_sound);
                final MediaPlayer o_play=MediaPlayer.create(this,R.raw.o_sound);
                final MediaPlayer wrong_play=MediaPlayer.create(this,R.raw.wrong_click);
                final MediaPlayer win_play=MediaPlayer.create(this,R.raw.win_sound);
                final MediaPlayer tie_play=MediaPlayer.create(this,R.raw.tie_sound);
                //----------------End of Decleareing------------//


                //----------------box1------------------------//
                box1.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                if (game[1]=="A"){
                                        Integer temp_player=(player[0]%2);
                                        button_selector(game,temp_player,x_play,o_play,box1,player_display,1);
                                        winner_checker(game,temp_player,winner,hr_top,hr_mid,hr_down,vr_left,vr_mid,vr_right,left_to_down,left_to_up,win_play);
                                        tie_checker(restart_button,player_display,winner,player,player[0],win_page,win_sign,tie_sign,win_play,tie_play,box1,box2,box3,box4,box5,box6,box7,box8,box9);
                                        player[0]++;
                                }
                                else{
                                        Toast.makeText(MainActivity.this,"Slot taken! Click empty slot",Toast.LENGTH_SHORT).show();
                                        wrong_play.start();
                                }
                        }
                });
                box2.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                if (game[2]=="A"){
                                        Integer temp_player=(player[0]%2);
                                        button_selector(game,temp_player,x_play,o_play,box2,player_display,2);
                                        winner_checker(game,temp_player,winner,hr_top,hr_mid,hr_down,vr_left,vr_mid,vr_right,left_to_down,left_to_up,win_play);
                                        tie_checker(restart_button,player_display,winner,player,player[0],win_page,win_sign,tie_sign,win_play,tie_play,box1,box2,box3,box4,box5,box6,box7,box8,box9);
                                        player[0]++;
                                }
                                else{
                                        Toast.makeText(MainActivity.this,"Slot taken! Click empty slot",Toast.LENGTH_SHORT).show();
                                        wrong_play.start();
                                }
                        }
                });
                box3.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                if (game[3]=="A"){
                                        Integer temp_player=(player[0]%2);
                                        button_selector(game,temp_player,x_play,o_play,box3,player_display,3);
                                        winner_checker(game,temp_player,winner,hr_top,hr_mid,hr_down,vr_left,vr_mid,vr_right,left_to_down,left_to_up,win_play);
                                        tie_checker(restart_button,player_display,winner,player,player[0],win_page,win_sign,tie_sign,win_play,tie_play,box1,box2,box3,box4,box5,box6,box7,box8,box9);
                                        player[0]++;
                                }
                                else{
                                        Toast.makeText(MainActivity.this,"Slot taken! Click empty slot",Toast.LENGTH_SHORT).show();
                                        wrong_play.start();
                                }
                        }
                });
                box4.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                if (game[4]=="A"){
                                        Integer temp_player=(player[0]%2);
                                        button_selector(game,temp_player,x_play,o_play,box4,player_display,4);
                                        winner_checker(game,temp_player,winner,hr_top,hr_mid,hr_down,vr_left,vr_mid,vr_right,left_to_down,left_to_up,win_play);
                                        tie_checker(restart_button,player_display,winner,player,player[0],win_page,win_sign,tie_sign,win_play,tie_play,box1,box2,box3,box4,box5,box6,box7,box8,box9);
                                        player[0]++;
                                }
                                else{
                                        Toast.makeText(MainActivity.this,"Slot taken! Click empty slot",Toast.LENGTH_SHORT).show();
                                        wrong_play.start();
                                }
                        }
                });
                box5.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                if (game[5]=="A"){
                                        Integer temp_player=(player[0]%2);
                                        button_selector(game,temp_player,x_play,o_play,box5,player_display,5);
                                        winner_checker(game,temp_player,winner,hr_top,hr_mid,hr_down,vr_left,vr_mid,vr_right,left_to_down,left_to_up,win_play);
                                        tie_checker(restart_button,player_display,winner,player,player[0],win_page,win_sign,tie_sign,win_play,tie_play,box1,box2,box3,box4,box5,box6,box7,box8,box9);
                                        player[0]++;
                                }
                                else{
                                        Toast.makeText(MainActivity.this,"Slot taken! Click empty slot",Toast.LENGTH_SHORT).show();
                                        wrong_play.start();
                                }
                        }
                });
                box6.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                if (game[6]=="A"){
                                        Integer temp_player=(player[0]%2);
                                        button_selector(game,temp_player,x_play,o_play,box6,player_display,6);
                                        winner_checker(game,temp_player,winner,hr_top,hr_mid,hr_down,vr_left,vr_mid,vr_right,left_to_down,left_to_up,win_play);
                                        tie_checker(restart_button,player_display,winner,player,player[0],win_page,win_sign,tie_sign,win_play,tie_play,box1,box2,box3,box4,box5,box6,box7,box8,box9);
                                        player[0]++;
                                }
                                else{
                                        Toast.makeText(MainActivity.this,"Slot taken! Click empty slot",Toast.LENGTH_SHORT).show();
                                        wrong_play.start();
                                }
                        }
                });
                box7.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                if (game[7]=="A"){
                                        Integer temp_player=(player[0]%2);
                                        button_selector(game,temp_player,x_play,o_play,box7,player_display,7);
                                        winner_checker(game,temp_player,winner,hr_top,hr_mid,hr_down,vr_left,vr_mid,vr_right,left_to_down,left_to_up,win_play);
                                        tie_checker(restart_button,player_display,winner,player,player[0],win_page,win_sign,tie_sign,win_play,tie_play,box1,box2,box3,box4,box5,box6,box7,box8,box9);
                                        player[0]++;
                                }
                                else{
                                        Toast.makeText(MainActivity.this,"Slot taken! Click empty slot",Toast.LENGTH_SHORT).show();
                                        wrong_play.start();
                                }
                        }
                });
                box8.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                if (game[8]=="A"){
                                        Integer temp_player=(player[0]%2);
                                        button_selector(game,temp_player,x_play,o_play,box8,player_display,8);
                                        winner_checker(game,temp_player,winner,hr_top,hr_mid,hr_down,vr_left,vr_mid,vr_right,left_to_down,left_to_up,win_play);
                                        tie_checker(restart_button,player_display,winner,player,player[0],win_page,win_sign,tie_sign,win_play,tie_play,box1,box2,box3,box4,box5,box6,box7,box8,box9);
                                        player[0]++;
                                }
                                else{
                                        Toast.makeText(MainActivity.this,"Slot taken! Click empty slot",Toast.LENGTH_SHORT).show();
                                        wrong_play.start();
                                }
                        }
                });
                box9.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                if (game[9]=="A"){
                                        Integer temp_player=(player[0]%2);
                                        button_selector(game,temp_player,x_play,o_play,box9,player_display,9);
                                        winner_checker(game,temp_player,winner,hr_top,hr_mid,hr_down,vr_left,vr_mid,vr_right,left_to_down,left_to_up,win_play);
                                        tie_checker(restart_button,player_display,winner,player,player[0],win_page,win_sign,tie_sign,win_play,tie_play,box1,box2,box3,box4,box5,box6,box7,box8,box9);
                                        player[0]++;
                                }
                                else{
                                        Toast.makeText(MainActivity.this,"Slot taken! Click empty slot",Toast.LENGTH_SHORT).show();
                                        wrong_play.start();
                                }
                        }
                });


                restart_button.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                                finish();
                                startActivity(getIntent());
                                overridePendingTransition(0,0);
                                String time=System.currentTimeMillis()+"";
                        }
                });




        }
}