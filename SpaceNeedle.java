//Ai Quynh Nguyen
//10/7/2017
//CSE142
//TA:Daniel Sullivan
//Assisgnment #2
//
//This program is an image of the Space Needle. 

public class SpaceNeedle{
   public static final int SIZE=4;
   public static void main (String[] args){
      sticks();
      top();
      bottom();
      sticks();
      middlePart();
      top();
   }
   
   //Draw the top peak of the Space Needle with sticks.
     public static void sticks(){
      for(int line = 1; line <= SIZE; line++){
         for(int spaces = 1; spaces <= 3*SIZE; spaces++){
            System.out.print(" ");
         }
         System.out.println("||");
      }
   }
   
   //Draw the first layer of the top hat.
   //Also as the base of the Space Needle.
   public static void top(){
      for(int line = 1; line <= SIZE; line++){
         for( int spaces = 1; spaces <= SIZE - line; spaces++){
            System.out.print("   ");
         }
         System.out.print("__/");
         for(int periods = 1; periods <= 1*line - 1; periods++){
            System.out.print(":::");
         }
         System.out.print("||");
         for(int periods = 1; periods <= 1*line - 1; periods++){
            System.out.print(":::");
         }
         System.out.print("\\__");
         
         System.out.println();
      }
      System.out.print("|");
      for( int quotations = 1; quotations <= SIZE * 6; quotations++){
         System.out.print("\"");
      }
      System.out.println("|");
      
   }
   
   //Draw the bottom half of the Space Needle hat.
   public static void bottom(){
      for( int j = 1; j <= SIZE; j++){
         for (int spaces = 1; spaces <= j * 2 - 2; spaces++){
            System.out.print(" ");
         }
         System.out.print("\\_");
         for( int dash = 1; dash <= (-2 * j + (3 * SIZE)) + 1; dash++){
            System.out.print("/\\");
         }
         System.out.print("_/");
         System.out.println();
         
      }
   }
   
   //Draw the body part of the Space Needle.
   public static void middlePart(){
      for (int k = 1; k <= SIZE * SIZE; k++){
         for (int spaces = 1; spaces <= SIZE * 2 +1 ; spaces++){
            System.out.print(" ");
         }
         System.out.print("|");
         for (int percentage = 1; percentage <= 1* SIZE - 2; percentage++){
            System.out.print("%");
         }
         System.out.print("||");
         for (int percentage = 1; percentage <= 1 * SIZE - 2; percentage++){
            System.out.print("%");
         }
         System.out.print("|");
         
         System.out.println();
      }
   }
}