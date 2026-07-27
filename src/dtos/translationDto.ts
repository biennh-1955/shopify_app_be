import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class TranslationDto {
  @IsString()
  @IsNotEmpty()
  locale: string;

  @IsObject()
  translate: {
    placeholder_text: string;
    button_text: string;
  };
}