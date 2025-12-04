from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Dossier

# Create your views here.
@require_http_methods(["POST"])
@csrf_exempt
def deposer_dossier(request):
    try:
        data = json.loads(request.body)
        dossier = Dossier.objects.create(
            **data
        )
        return JsonResponse({
            'success': True,
            'dossier_id': dossier.id
        }, status=201)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    

@require_http_methods(["GET"])
def lister_dossiers(request):
        try:
            dossiers = Dossier.objects.all().values()
            return JsonResponse({
                'success': True,
                'dossiers': list(dossiers)
            }, status=200)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)
        
####Statistiques des dossiers par état (optionnel)
@require_http_methods(["GET"])
def statistiques_dossiers_fermes(request):
    try:
        count = Dossier.objects.filter(etat='ferme').count()
        return JsonResponse({
            'success': True,
            'dossiers_fermes': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_acceptes(request):
    try:
        count = Dossier.objects.filter(etat='accepté').count()
        return JsonResponse({
            'success': True,
            'dossiers_acceptes': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_rejetes(request):
    try:
        count = Dossier.objects.filter(etat='rejeté').count()
        return JsonResponse({
            'success': True,
            'dossiers_rejetes': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteDRI(request):
    try:
        count = Dossier.objects.filter(etat='en attente de DRI').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_de_DRI': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteDEVE(request):
    try:
        count = Dossier.objects.filter(etat='en attente de DEVE').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_de_DEVE': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)

@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteCA(request):
    try:
        count = Dossier.objects.filter(etat='en attente de CE').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_CA': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteCEVE(request):
    try:
        count = Dossier.objects.filter(etat='en attente de CEVE').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_CEVE': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteCEVU(request):
    try:
        count = Dossier.objects.filter(etat='en attente de CEVU').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_CEVU': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)