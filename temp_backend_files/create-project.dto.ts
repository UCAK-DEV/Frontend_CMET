// src/modules/projects/dto/create-project.dto.ts
import { IsNotEmpty, IsString, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Saytu Gateway', description: 'Le nom de ton projet' })
  @IsString()
  @IsNotEmpty({ message: 'Le nom du projet est obligatoire' })
  name: string;

  @ApiProperty({ example: 'https://github.com/ton-profil/repo', description: 'Lien vers le dépôt GitHub' })
  @IsUrl({}, { message: 'Le lien GitHub doit être une URL valide' })
  @IsNotEmpty({ message: 'Le lien GitHub est obligatoire' })
  github_url: string;

  @ApiProperty({ example: 'Système de gestion de porte via QR Code', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
