"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  ImageIcon,
  Loader2,
  Eye,
  Calendar,
  Briefcase,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import RichTextEditor from "@/components/ui/rich-text-editor";
import axios from "axios";

interface SupportModel {
  _id?: string;
  title: string;
  shortDescription?: string;
  description: string;
  image: string;
  gallery?: string[];
  features: string[];
  slug: string;
  status: string;
  order: number;
  views?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function SupportModelsPage() {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [supportModels, setSupportModels] = useState<SupportModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    features: "",
    image: "",
    gallery: [] as string[],
    status: "active",
    order: 0,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<{
    image: File | null;
    galleryImages: File[];
  }>({
    image: null,
    galleryImages: [],
  });

  // Fetch support models
  const fetchSupportModels = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.get(`/api/admin/support-models?page=${page}&limit=6`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setSupportModels(response.data.data);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
        setCurrentPage(page);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch support models",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportModels(currentPage);
  }, [currentPage]);

  const handleEdit = (model: SupportModel) => {
    setEditingId(model._id || null);
    setFormData({
      title: model.title,
      shortDescription: model.shortDescription || "",
      description: model.description,
      features: model.features.join(", "),
      image: model.image,
      gallery: model.gallery || [],
      status: model.status,
      order: model.order,
      seoTitle: model.seoTitle || "",
      seoDescription: model.seoDescription || "",
      seoKeywords: model.seoKeywords || "",
    });
    setSelectedFiles({
      image: null,
      galleryImages: [],
    });
    setIsAddModalOpen(true);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required.",
        variant: "destructive",
      });
      return;
    }

    if (!editingId && !selectedFiles.image) {
      toast({
        title: "Validation Error",
        description: "Image is required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const submitFormData = new FormData();
      submitFormData.append("title", formData.title.trim());
      submitFormData.append("shortDescription", formData.shortDescription.trim());
      submitFormData.append("description", formData.description.trim());
      submitFormData.append("status", formData.status);
      submitFormData.append("order", formData.order.toString());
      submitFormData.append(
        "features",
        JSON.stringify(
          formData.features
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f)
        )
      );
      submitFormData.append("seoTitle", formData.seoTitle.trim());
      submitFormData.append("seoDescription", formData.seoDescription.trim());
      submitFormData.append("seoKeywords", formData.seoKeywords.trim());

      if (selectedFiles.image) {
        submitFormData.append("image", selectedFiles.image);
      } else if (formData.image) {
        submitFormData.append("existingImage", formData.image);
      }

      // Add existing gallery URLs
      formData.gallery.forEach((url, index) => {
        if (!url.startsWith('blob:')) {
          submitFormData.append(`existingGallery[${index}]`, url);
        }
      });

      // Add new gallery image files
      selectedFiles.galleryImages.forEach((file) => {
        submitFormData.append(`galleryImages`, file);
      });

      const url = editingId
        ? `/api/admin/support-models/${editingId}`
        : "/api/admin/support-models";
      const method = editingId ? "put" : "post";

      const response = await axios[method](url, submitFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast({
          title: editingId ? "Support Model Updated" : "Support Model Added",
          description: `Support Model has been successfully ${
            editingId ? "updated" : "added"
          }.`,
        });
        fetchSupportModels(currentPage);
        handleCancel();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to save support model",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.delete(`/api/admin/support-models/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast({
          title: "Support Model Deleted",
          description: "Support Model has been successfully deleted.",
        });
        setDeletingId(null);
        
        // Check if we need to go back to previous page
        const remainingItems = Array.isArray(supportModels) ? supportModels.filter((s) => s._id !== id) : [];
        if (remainingItems.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchSupportModels(currentPage);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete support model",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
    setEditingId(null);
    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      features: "",
      image: "",
      gallery: [],
      status: "active",
      order: 0,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setSelectedFiles({
      image: null,
      galleryImages: [],
    });
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFiles((prev) => ({ ...prev, image: file }));
        const previewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, image: previewUrl }));
        toast({
          title: "Image Selected",
          description: "Click Save to upload the image.",
        });
      }
    };
    input.click();
  };

  const handleGalleryUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        setSelectedFiles((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, ...files],
        }));
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, ...previewUrls],
        }));
        toast({
          title: "Gallery Images Selected",
          description: `${files.length} image(s) added. Click Save to upload.`,
        });
      }
    };
    input.click();
  };

  const removeGalleryImage = (index: number) => {
    const removedUrl = formData.gallery[index];

    if (removedUrl && removedUrl.startsWith("blob:")) {
      const blobIndex = formData.gallery
        .filter((url) => url.startsWith("blob:"))
        .indexOf(removedUrl);
      if (blobIndex !== -1) {
        setSelectedFiles((prev) => ({
          ...prev,
          galleryImages: prev.galleryImages.filter((_, i) => i !== blobIndex),
        }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPaginationItems = () => {
    if (!pagination) return [];
    
    const items = [];
    const { currentPage, totalPages } = pagination;

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(currentPage - 1)}
          className={
            !pagination.hasPrevPage
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    // Page numbers
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`cursor-pointer ${
                currentPage === i
                  ? "bg-primary text-white border-0 hover:bg-primary-hover"
                  : ""
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            className={`cursor-pointer ${
              currentPage === 1
                ? "bg-primary text-white border-0 hover:bg-primary-hover"
                : ""
            }`}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`cursor-pointer ${
                currentPage === i
                  ? "bg-primary text-white border-0 hover:bg-primary-hover"
                  : ""
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className={`cursor-pointer ${
              currentPage === totalPages
                ? "bg-primary text-white border-0 hover:bg-primary-hover"
                : ""
            }`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => handlePageChange(currentPage + 1)}
          className={
            !pagination.hasNextPage
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading support models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-secondary">
            Support Models Manager
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your NDIS support models
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: "",
              shortDescription: "",
              description: "",
              features: "",
              image: "",
              gallery: [],
              status: "active",
              order: 0,
              seoTitle: "",
              seoDescription: "",
              seoKeywords: "",
            });
            setSelectedFiles({
              image: null,
              galleryImages: [],
            });
            setIsAddModalOpen(true);
          }}
          className="bg-primary hover:bg-primary-hover text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Support Model
        </Button>
      </div>

      {/* Support Models List - Horizontal Cards */}
      {supportModels.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="bg-gray-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-secondary mb-1">
            No support models found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating your first support model.
          </p>
          <Button
            onClick={() => {
              setEditingId(null);
              setFormData({
                title: "",
                shortDescription: "",
                description: "",
                features: "",
                image: "",
                gallery: [],
                status: "active",
                order: 0,
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
              });
              setSelectedFiles({
                image: null,
                galleryImages: [],
              });
              setIsAddModalOpen(true);
            }}
            className="bg-primary hover:bg-primary-hover text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Support Model
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {supportModels.map((model) => (
            <Card key={model._id} className="shadow-xl border-0">
              <CardContent className="p-6">
                <div className="flex gap-6 h-full">
                  {/* Left Side - Image */}
                  <div className="flex-shrink-0 flex flex-col">
                    <div className="w-80 h-56 rounded-lg overflow-hidden border-0 shadow-md">
                      <Image
                        src={model.image}
                        alt={model.title}
                        width={320}
                        height={224}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Gallery Preview */}
                    {model.gallery && model.gallery.length > 0 && (
                      <div className="mt-3">
                        <div className="flex gap-2 overflow-x-auto">
                          {model.gallery.slice(0, 4).map((image, index) => (
                            <div key={index} className="flex-shrink-0">
                              <Image
                                src={image}
                                alt={`Gallery ${index + 1}`}
                                width={60}
                                height={40}
                                className="w-15 h-10 object-cover rounded border"
                              />
                            </div>
                          ))}
                          {model.gallery.length > 4 && (
                            <div className="flex-shrink-0 w-15 h-10 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-600">
                              +{model.gallery.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex-1 flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-semibold text-secondary">
                          {model.title}
                        </h3>
                        <Badge
                          className={
                            model.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }
                        >
                          {model.status}
                        </Badge>
                      </div>

                      {model.shortDescription && (
                        <p className="text-gray-600 mb-4">
                          {model.shortDescription}
                        </p>
                      )}

                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>{model.views || 0} views</span>
                        </div>
                      </div>

                      {model.features && model.features.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Features:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {model.features.slice(0, 3).map((feature, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                            {model.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{model.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        onClick={() => handleEdit(model)}
                        variant="outline"
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          setDeletingId(model._id || null)
                        }
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 whitespace-nowrap"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>{renderPaginationItems()}</PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog 
        open={isAddModalOpen} 
        onOpenChange={(open) => {
          if (!open) {
            handleCancel();
          } else {
            setIsAddModalOpen(open);
          }
        }}
      >
        <DialogContent className="!max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-secondary">
              {editingId ? "Edit Support Model" : "Add New Support Model"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary">
                Basic Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Household Tasks"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Order</Label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Short Description</Label>
                <Input
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDescription: e.target.value,
                    })
                  }
                  placeholder="Brief description (max 200 characters)"
                  maxLength={200}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Full Description *</Label>
                <div className="mt-2">
                  <RichTextEditor
                    value={formData.description}
                    onChange={(value) =>
                      setFormData({ ...formData, description: value })
                    }
                    placeholder="Detailed description of the support model"
                  />
                </div>
              </div>

              <div>
                <Label>Features (comma-separated)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  placeholder="e.g., Flexible Hours, Experienced Staff"
                  rows={3}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary">Image</h3>
              <div>
                <Label>Cover Image *</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-4">
                  {formData.image ? (
                    <div className="relative h-48">
                      <Image
                        src={formData.image}
                        alt="Support Model"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center bg-gray-50">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <Button
                    type="button"
                    onClick={handleImageUpload}
                    variant="outline"
                    className="w-full mt-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary">
                Gallery Images (Optional)
              </h3>
              <div>
                <Label>Additional Images</Label>
                <div className="mt-2 space-y-4">
                  <Button
                    type="button"
                    onClick={handleGalleryUpload}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Add Gallery Images
                  </Button>

                  {formData.gallery.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.gallery.map((url, index) => (
                        <div
                          key={index}
                          className="relative group border-2 border-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="relative h-32">
                            <Image
                              src={url}
                              alt={`Gallery ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary">Settings</h3>
              <div>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SEO */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary">
                SEO (Optional)
              </h3>
              <div>
                <Label>SEO Title</Label>
                <Input
                  value={formData.seoTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, seoTitle: e.target.value })
                  }
                  placeholder="e.g., Household Tasks Support | Elegant Care Service"
                  maxLength={200}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>SEO Description</Label>
                <Textarea
                  value={formData.seoDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seoDescription: e.target.value,
                    })
                  }
                  placeholder="Brief description for search engines (max 300 characters)"
                  maxLength={300}
                  rows={3}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>SEO Keywords</Label>
                <Input
                  value={formData.seoKeywords}
                  onChange={(e) =>
                    setFormData({ ...formData, seoKeywords: e.target.value })
                  }
                  placeholder="e.g., NDIS household tasks, domestic assistance"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary hover:bg-primary-hover text-white"
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingId ? "Update Model" : "Save Model"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              support model.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
