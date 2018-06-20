//Ai Quynh Nguyen
//10/4/17
//CSE142
//TA:Daniel Sullivan
//Assignment #1
//
//This program willbe about an old woman who swallowed animals.

public class Song{
   public static void main (String [] args){
      verse1();
      verse2();
      verse3();
      verse4();
      verse5();
      verse6();
      theEnd();
   }
   public static void endLine(){
      System.out.println("I don't know why she swallowed that fly,");
      System.out.println("Perhaps she'll die.");
      System.out.println();
   }
   public static void swallowedSpider(){
      System.out.println("She swallowed the spider to catch the fly,");
   }
   public static void swallowedBird(){
      System.out.println("She swallowed the bird to catch the spider,");
      
   }
   public static void swallowedCat(){
      System.out.println("She swallowed the cat to catch the bird,");
   }
   public static void swallowedDog(){
      System.out.println("She swallowed the dog to catch the cat,");
   }
   public static void verse1(){
      System.out.println("There was an old woman who swallowed a fly.");
      endLine();
   }
   public static void verse2(){
      System.out.println("There was an old woman who swallowed a spider,");
      System.out.println("That wriggled and iggled and jiggled inside her.");
      swallowedSpider();
      endLine();
   }
   public static void verse3(){
      System.out.println("There was an old woman who swallowed a bird,");
      System.out.println("How absurd to swallow a bird.");
      swallowedBird();
      swallowedSpider();
      endLine();
   }
   public static void verse4(){
      System.out.println("There was an old woman who swallowed a cat,");
      System.out.println("Imagine that to swallow a cat.");
      swallowedCat();
      swallowedBird();
      swallowedSpider();
      endLine();
   }
   public static void verse5(){
      System.out.println("There was an old woman who swallowed a dog,");
      System.out.println("What a hog to swallow a dog.");
      swallowedDog();
      swallowedCat();
      swallowedBird();
      swallowedSpider();
      endLine();
   }
   public static void verse6(){
      System.out.println("There was an old woman who swallowed a bee,");
      System.out.println("How cruel to swallow a bee.");
      System.out.println("She swallowed the bee to catch the dog,");
      swallowedDog();
      swallowedCat();
      swallowedBird();
      swallowedSpider();
      endLine();
   }
   public static void theEnd(){
      System.out.println("There was an old woman who swallowed a horse,");
      System.out.println("She died of course.");
   }
}