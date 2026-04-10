import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { getFirebaseClientStatus } from '../../firebase-client';

interface BackendHealthResponse {
  name: string;
  status: string;
  timestamp: string;
  firebaseAdmin: {
    configured: boolean;
    projectId: string | null;
    message: string;
  };
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePageComponent implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly clientStatus = signal(getFirebaseClientStatus());
  protected readonly backendState = signal<{
    loading: boolean;
    data?: BackendHealthResponse;
    error?: string;
  }>({ loading: true });

  protected readonly features = [
    {
      title: 'Questionnaire structure',
      copy:
        'Un questionnaire complet couvrant la strategie, les processus, les technologies, les competences et la collaboration.',
      icon: '01',
    },
    {
      title: 'Score automatique',
      copy:
        'Obtenez instantanement votre score de maturite BIM base sur les standards internationaux et les meilleures pratiques.',
      icon: '02',
    },
    {
      title: 'Recommandations claires',
      copy:
        'Identifiez les actions prioritaires pour faire progresser votre organisation avec une feuille de route lisible.',
      icon: '03',
    },
  ];

  protected readonly reasons = [
    {
      title: 'Comprendre votre position actuelle',
      copy: 'Identifiez precisement ou se situe votre entreprise sur l echelle de maturite BIM.',
    },
    {
      title: 'Identifier les points d amelioration',
      copy: 'Decouvrez vos forces et faiblesses pour prioriser vos investissements.',
    },
    {
      title: 'Planifier votre progression',
      copy: 'Obtenez une feuille de route claire pour monter en competence a votre rythme.',
    },
    {
      title: 'Rester competitif',
      copy: 'Assurez-vous que votre entreprise repond aux exigences du marche et des appels d offres.',
    },
  ];

  ngOnInit(): void {
    this.http.get<BackendHealthResponse>(`${environment.apiUrl}/health`).subscribe({
      next: (data) => this.backendState.set({ loading: false, data }),
      error: () =>
        this.backendState.set({
          loading: false,
          error: `Impossible de joindre ${environment.apiUrl}/health`,
        }),
    });
  }
}
